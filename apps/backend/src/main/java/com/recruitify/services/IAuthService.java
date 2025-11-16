package com.recruitify.services;

import com.recruitify.dtos.Request.LoginRequest;
import com.recruitify.dtos.Request.RefreshTokenRequest;
import com.recruitify.dtos.Request.RegisterRequest;
import com.recruitify.dtos.Response.JwtResponse;
import com.recruitify.dtos.Response.MessageResponse;

public interface IAuthService {
    JwtResponse authenticateUser(LoginRequest loginRequest);
    JwtResponse refreshToken(RefreshTokenRequest refreshTokenRequest);
    MessageResponse registerUser(RegisterRequest registerRequest);
    boolean existsByEmail(String email);
    boolean existsByUsername(String username);
}
