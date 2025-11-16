package com.recruitify.controller;

import com.recruitify.dtos.Request.LoginRequest;
import com.recruitify.dtos.Request.RegisterRequest;
import com.recruitify.dtos.Response.JwtResponse;
import com.recruitify.dtos.Response.MessageResponse;
import com.recruitify.event.AuthenticationEvent;
import com.recruitify.exceptions.AccountDeactivatedException;
import com.recruitify.services.IAuthService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.context.ApplicationEventPublisher;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v1/auth")
@RequiredArgsConstructor
@Tag(name = "Authentication", description = "Authentication API endpoints")
public class AuthController {
    private final IAuthService authService;
    private final ApplicationEventPublisher eventPublisher;

    @PostMapping("/login")
    @Operation(
            summary = "Authenticate user",
            description = "Authenticate user with username and password, returns JWT token",
            responses = {
                    @ApiResponse(
                            responseCode = "200",
                            description = "Successfully authenticated",
                            content = @Content(schema = @Schema(implementation = JwtResponse.class))
                    ),
                    @ApiResponse(
                            responseCode = "401",
                            description = "Invalid username or password"
                    )
            }
    )
    public ResponseEntity<JwtResponse> login(
            @Valid @RequestBody LoginRequest loginRequest,
            HttpServletRequest request) {
        try {
            JwtResponse jwtResponse = authService.authenticateUser(loginRequest);
            // Publish successful login event
            eventPublisher.publishEvent(new AuthenticationEvent(
                    this,
                    loginRequest.getEmail(),
                    AuthenticationEvent.AuthEventType.LOGIN_SUCCESS,
                    "Login successful",
                    getClientIp(request)
            ));
            return ResponseEntity.ok(jwtResponse);
        } catch (AccountDeactivatedException e) {
            // Publish failed login event with specific reason
            eventPublisher.publishEvent(new AuthenticationEvent(
                    this,
                    loginRequest.getEmail(),
                    AuthenticationEvent.AuthEventType.LOGIN_FAILED,
                    "Account deactivated",
                    getClientIp(request)
            ));
            throw e;
        } catch (BadCredentialsException e) {
            // Publish failed login event
            eventPublisher.publishEvent(new AuthenticationEvent(
                    this,
                    loginRequest.getEmail(),
                    AuthenticationEvent.AuthEventType.LOGIN_FAILED,
                    "Invalid credentials",
                    getClientIp(request)
            ));
            throw e;
        }
    }

    @PostMapping("/register")
    @Operation(
            summary = "Register new user",
            description = "Register a new user with provided details",
            responses = {
                    @ApiResponse(
                            responseCode = "201",
                            description = "User registered successfully",
                            content = @Content(schema = @Schema(implementation = MessageResponse.class))
                    ),
                    @ApiResponse(
                            responseCode = "400",
                            description = "Invalid data or username/email already in use"
                    )
            }
    )
    public ResponseEntity<MessageResponse> register(
            @Valid @RequestBody RegisterRequest registerRequest,
            HttpServletRequest request) {
        MessageResponse response = authService.registerUser(registerRequest);

        if (response.isSuccess()) {
            eventPublisher.publishEvent(new AuthenticationEvent(
                    this,
                    registerRequest.getEmail(),
                    AuthenticationEvent.AuthEventType.REGISTER_SUCCESS,
                    "Registration successful",
                    getClientIp(request)
            ));
            return ResponseEntity.status(HttpStatus.CREATED).body(response);
        } else {
            return ResponseEntity.badRequest().body(response);
        }
    }

    //getIp Address
    private String getClientIp(HttpServletRequest request) {
        String xfHeader = request.getHeader("X-Forwarded-For");
        if (xfHeader == null) {
            return request.getRemoteAddr();
        }
        return xfHeader.split(",")[0];
    }
}
