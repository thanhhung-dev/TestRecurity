package com.recruitify.services.impl;

import com.recruitify.dtos.Request.LoginRequest;
import com.recruitify.dtos.Request.RefreshTokenRequest;
import com.recruitify.dtos.Request.RegisterRequest;
import com.recruitify.dtos.Response.JwtResponse;
import com.recruitify.dtos.Response.MessageResponse;
import com.recruitify.exceptions.TokenRefreshException;
import com.recruitify.model.RefreshToken;
import com.recruitify.model.Role;
import com.recruitify.model.User;
import com.recruitify.repository.IRoleRepository;
import com.recruitify.repository.IUserRepository;
import com.recruitify.security.UserDetailsImpl;
import com.recruitify.services.IAuthService;
import com.recruitify.services.IRefreshTokenService;
import com.recruitify.services.ITokenServices;
import org.springframework.transaction.annotation.Transactional;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.ObjectProvider;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.time.Instant;
import java.util.List;

@Slf4j
@Service
public class AuthService implements UserDetailsService, IAuthService {
    private final IUserRepository userRepository;
    private final IRoleRepository roleRepository;
    private final ITokenServices tokenService;
    private final PasswordEncoder passwordEncoder;
    private final ObjectProvider<AuthenticationManager> authenticationManagerProvider;
    private final IRefreshTokenService refreshTokenService;

    public AuthService(IUserRepository userRepository,
                       IRoleRepository roleRepository,
                       ITokenServices tokenService,
                       PasswordEncoder passwordEncoder,
                       ObjectProvider<AuthenticationManager> authenticationManagerProvider,
                       IRefreshTokenService refreshTokenService) {
        this.userRepository = userRepository;
        this.roleRepository = roleRepository;
        this.tokenService = tokenService;
        this.passwordEncoder = passwordEncoder;
        this.authenticationManagerProvider = authenticationManagerProvider;
        this.refreshTokenService = refreshTokenService;
    }

    @Override
    @Transactional(readOnly = true)
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new UsernameNotFoundException("User Not Found with email: " + email));

        // Check if account is active
        if (!user.getIsActive()) {
            log.warn("Failed login attempt for inactive account: {}", email);
            throw new RuntimeException("Account is deactivated");
        }

        // Check if account is locked
        if (user.getLockedUntil() != null && user.getLockedUntil().isAfter(Instant.now())) {
            log.warn("Failed login attempt for locked account: {}", email);
            throw new RuntimeException("Account is temporarily locked until " + user.getLockedUntil());
        }

        return UserDetailsImpl.build(user);
    }

    @Override
    @Transactional
    public JwtResponse authenticateUser(LoginRequest loginRequest) {
        try {
            // Get authentication manager lazily to avoid circular dependency
            AuthenticationManager authenticationManager = authenticationManagerProvider.getObject();

            // Authenticate
            Authentication authentication = authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(
                            loginRequest.getEmail(),
                            loginRequest.getPassword()));

            SecurityContextHolder.getContext().setAuthentication(authentication);
            UserDetailsImpl userDetails = (UserDetailsImpl) authentication.getPrincipal();

            // Generate JWT access token
            String accessToken = tokenService.generateAccessToken(userDetails);

            // Get user for refresh token
            User user = userRepository.findByEmail(userDetails.getEmail())
                    .orElseThrow(() -> new UsernameNotFoundException("User not found with email: " + userDetails.getEmail()));

            // Create refresh token with retry mechanism
            RefreshToken refreshToken;
            try {
                refreshToken = refreshTokenService.createRefreshToken(user);
            } catch (DataIntegrityViolationException ex) {
                // If we hit a constraint violation, try to find existing token
                log.warn("Constraint violation creating refresh token, checking for existing tokens");
                List<RefreshToken> activeTokens = refreshTokenService.findActiveTokensByUser(user);
                if (activeTokens.isEmpty()) {
                    throw new RuntimeException("Could not create or find valid refresh token");
                }
                refreshToken = activeTokens.get(0);
            }

            String role = user.getRole().getName();

            return JwtResponse.builder()
                    .accessToken(accessToken)
                    .refreshToken(refreshToken.getToken())
                    .id(userDetails.getId())
                    .email(userDetails.getEmail())
                    .role(role)
                    .build();
        } catch (Exception e) {
            log.error("Authentication error: ", e);
            throw e;
        }
    }


    @Override
    @Transactional
    public JwtResponse refreshToken(RefreshTokenRequest refreshTokenRequest) {
        String requestRefreshToken = refreshTokenRequest.getRefreshToken();

        return refreshTokenService.findByToken(requestRefreshToken)
                .map(refreshTokenService::verifyExpiration)
                .map(refreshToken -> {
                    User user = refreshToken.getUser();
                    UserDetailsImpl userDetails = UserDetailsImpl.build(user);

                    // Generate new access token
                    String accessToken = tokenService.generateAccessToken(userDetails);

                    // Generate new refresh token with retry mechanism
                    RefreshToken newRefreshToken;
                    try {
                        newRefreshToken = refreshTokenService.createRefreshToken(user);
                    } catch (DataIntegrityViolationException ex) {
                        // If we hit a constraint violation, try to find an active token
                        List<RefreshToken> activeTokens = refreshTokenService.findActiveTokensByUser(user);
                        if (activeTokens.isEmpty()) {
                            throw new TokenRefreshException(requestRefreshToken,
                                    "Could not create new refresh token due to constraint violation");
                        }
                        newRefreshToken = activeTokens.get(0);
                    }

                    // Mark old token as used and specify which token replaced it
                    refreshTokenService.useToken(refreshToken, newRefreshToken.getToken());

                    String role = user.getRole().getName();

                    return JwtResponse.builder()
                            .accessToken(accessToken)
                            .refreshToken(newRefreshToken.getToken())
                            .id(userDetails.getId())
                            .email(userDetails.getEmail())
                            .role(role)
                            .build();
                })
                .orElseThrow(() -> new TokenRefreshException(requestRefreshToken, "Refresh token not found in database"));
    }



    @Override
    @Transactional
    public MessageResponse registerUser(RegisterRequest registerRequest) {
        if (existsByUsername(registerRequest.getUsername())) {
            return MessageResponse.builder()
                    .message("Username is already taken")
                    .success(false)
                    .build();
        }
        if (existsByEmail(registerRequest.getEmail())) {
            return MessageResponse.builder()
                    .message("Email is already in use")
                    .success(false)
                    .build();
        }

        // Create new user account
        User user = User.builder()
                .username(registerRequest.getUsername())
                .email(registerRequest.getEmail())
                .passwordHash(passwordEncoder.encode(registerRequest.getPassword()))
                .build();

        String strRoles = registerRequest.getRole();
        Role role;

        if (strRoles == null || strRoles.isEmpty()) {
            role = roleRepository.findByName("ROLE_JOBSEEKER")
                    .orElseThrow(() -> new RuntimeException("Error: Role 'ROLE_USER' is not found."));
        } else {
            switch (strRoles.toUpperCase()) {
                case "admin" -> {
                    role  = roleRepository.findByName("ROLE_ADMIN")
                            .orElseThrow(() -> new RuntimeException("Error: Role 'ROLE_ADMIN' is not found."));
                }
                case "recruiter" -> {
                    role  = roleRepository.findByName("ROLE_RECRUITER")
                            .orElseThrow(() -> new RuntimeException("Error: Role 'ROLE_RECRUITER' is not found."));
                }
                default -> {
                    role  = roleRepository.findByName("ROLE_JOBSEEKER")
                            .orElseThrow(() -> new RuntimeException("Error: Role 'ROLE_JOBSEEKER' is not found."));
                }
            }
        }

        user.setRole(role);
        userRepository.save(user);

        log.info("User registered successfully: {}", user.getEmail());

        return MessageResponse.builder()
                .message("User registered successfully!")
                .success(true)
                .build();
    }


    @Override
    public boolean existsByEmail(String email) {
        return userRepository.existsByEmail(email);
    }

    @Override
    public boolean existsByUsername(String username) {
        return userRepository.existsByUsername(username);
    }
}
