package com.recruitify.services;

import com.recruitify.config.JwtConfig;
import com.recruitify.security.UserDetailsImpl;
import com.recruitify.services.impl.TokenServices;
import io.jsonwebtoken.Claims;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.authority.SimpleGrantedAuthority;

import java.util.List;

import static org.junit.jupiter.api.Assertions.*;

public class TokenServicesTest {
    private TokenServices tokenServices;
    private JwtConfig jwtConfig;

    @BeforeEach
    void setUp() {
        jwtConfig = new JwtConfig();
        jwtConfig.setSecret("rDjpL6NMo8pDZIHOT6Jfv0+qMDuR6hnuEDq+D9R+/1OHooaf3GMP4iLRW8Z5HhR6tg/rKQhtVM156AHgsD/tRw=="); // Base64
        jwtConfig.setExpirationMs(3600000);
        jwtConfig.setRefreshExpirationMs(7200000);
        tokenServices = new TokenServices(jwtConfig);
    }

    @Test
    void testGenerateAndParseAccessToken() {
        UserDetailsImpl user = UserDetailsImpl.builder()
                .id(1L)
                .email("test@example.com")
                .password("password")
                .authorities(List.of(new SimpleGrantedAuthority("ROLE_USER")))
                .build();


        String token = tokenServices.generateAccessToken(user);
        assertNotNull(token);

        assertTrue(tokenServices.validateToken(token));

        String username = tokenServices.getUsernameFromToken(token);
        assertEquals("test@example.com", username);


        Authentication auth = tokenServices.getAuthentication(token);
        assertNotNull(auth);
        assertEquals(username, auth.getName());
        assertTrue(auth.getAuthorities().stream()
                .anyMatch(a -> a.getAuthority().equals("ROLE_USER")));
    }

    @Test
    void testInvalidToken() {
        String invalidToken = "invalid.token.string";
        assertFalse(tokenServices.validateToken(invalidToken));
        assertNull(tokenServices.getAuthentication(invalidToken));
    }
}
