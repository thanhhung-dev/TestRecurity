package com.recruitify.services;

import com.recruitify.security.UserDetailsImpl;
import org.springframework.security.core.Authentication;

public interface ITokenServices {
    String generateAccessToken(UserDetailsImpl userPrincipal);
    String generateRefreshToken(UserDetailsImpl userPrincipal);
    String getUsernameFromToken(String token);
    boolean validateToken(String token);
    Authentication getAuthentication(String token);
}
