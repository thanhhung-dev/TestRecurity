package com.recruitify.services.impl;

import com.recruitify.config.JwtConfig;
import com.recruitify.model.RefreshToken;
import com.recruitify.model.User;
import com.recruitify.repository.IRefreshTokenRepository;
import com.recruitify.services.IRefreshTokenService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.stereotype.Service;

import java.time.Instant;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Slf4j
@Service
public class RefreshTokenService implements IRefreshTokenService {
    private final IRefreshTokenRepository refreshTokenRepository;
    private final JwtConfig jwtConfig;

    public RefreshTokenService(IRefreshTokenRepository refreshTokenRepository, JwtConfig jwtConfig) {
        this.refreshTokenRepository = refreshTokenRepository;
        this.jwtConfig = jwtConfig;
    }

    @Override
    public Optional<RefreshToken> findByToken(String token) {
        return refreshTokenRepository.findByToken(token);
    }

    @Override
    public RefreshToken createRefreshToken(User user) {
        String newToken = UUID.randomUUID().toString();

        try {
            // First, revoke all existing active tokens
            List<RefreshToken> activeTokens = refreshTokenRepository.findByUserAndIsRevokedFalseAndIsUsedFalse(user);

            if (!activeTokens.isEmpty()) {
                activeTokens.forEach(token -> {
                    token.setRevoked(true);
                    token.setReasonRevoked("Superseded by new token");
                    token.setReplacedByToken(newToken);
                });
                refreshTokenRepository.saveAll(activeTokens);
                log.debug("Revoked {} previous active tokens for user: {}", activeTokens.size(), user.getEmail());
            }

            // Now create a new token
            RefreshToken refreshToken = RefreshToken.builder()
                    .user(user)
                    .token(newToken)
                    .expiryDate(Instant.now().plusMillis(jwtConfig.getRefreshExpirationMs()))
                    .isUsed(false)
                    .isRevoked(false)
                    .build();

            RefreshToken savedToken = refreshTokenRepository.save(refreshToken);
            log.info("New refresh token created for email: {}", user.getEmail());

            return savedToken;
        } catch (DataIntegrityViolationException ex) {
            log.error("Could not create refresh token for email {}: {}",
                    user.getEmail(), ex.getMessage());

            // Check if we have any existing token that can be used
            List<RefreshToken> existingTokens = refreshTokenRepository.findByUser(user);
            if (!existingTokens.isEmpty()) {
                // Get the newest token (with highest creation timestamp)
                RefreshToken latestToken = existingTokens.stream()
                        .max((a, b) -> a.getCreatedAt().compareTo(b.getCreatedAt()))
                        .orElseThrow();

                // If it's not active, make it active
                if (!latestToken.isActive()) {
                    latestToken.setUsed(false);
                    latestToken.setRevoked(false);
                    latestToken.setExpiryDate(Instant.now().plusMillis(jwtConfig.getRefreshExpirationMs()));
                    return refreshTokenRepository.save(latestToken);
                }

                return latestToken;
            }

            throw new RuntimeException("Failed to create refresh token", ex);
        }
    }

    @Override
    public RefreshToken verifyExpiration(RefreshToken token) {
        return null;
    }

    @Override
    public List<RefreshToken> findActiveTokensByUser(User user) {
        return List.of();
    }

    @Override
    public RefreshToken useToken(RefreshToken token, String replacedByToken) {
        return null;
    }
}
