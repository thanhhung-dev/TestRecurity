package com.recruitify.repository;

import com.recruitify.model.RefreshToken;
import com.recruitify.model.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface IRefreshTokenRepository extends JpaRepository<RefreshToken, Long> {
    Optional<RefreshToken> findByToken(String token);
    List<RefreshToken> findByUser(User user);
    List<RefreshToken> findByUserAndIsRevokedFalseAndIsUsedFalse(User user);
}
