package com.recruitify.services;

import com.recruitify.services.impl.PasswordServiceImpl;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;

import static org.junit.Assert.*;

public class PasswordEncodeTest {
    private PasswordServiceImpl passwordService;
    private PasswordEncoder passwordEncoder;
    @BeforeEach
    void setUp() {
        passwordEncoder = new BCryptPasswordEncoder();
        passwordService = new PasswordServiceImpl(passwordEncoder);
    }

    @Test
    void testEncodePassword_Success() {
        String rawPassword = "HungHeo9997!";

        String encodedPassword = passwordService.encodePassword(rawPassword);

        assertNotNull(encodedPassword);
        assertNotEquals(rawPassword, encodedPassword);
        assertTrue(encodedPassword.startsWith("$2a$") || encodedPassword.startsWith("$2b$"));
        System.out.println("Encoded password: " + encodedPassword);
    }
    @Test
    void testValidate_Success() {
        String rawPassword = "HungHeo9997!";

        String encodedPassword = passwordService.encodePassword(rawPassword);
        boolean valid = passwordService.validatePassword(rawPassword,encodedPassword);
        assertTrue(valid);
    }

    @Test
    void testEncodePassword_ThrowsExceptionForNullPassword() {
        assertThrows(IllegalArgumentException.class, () -> {
            passwordService.encodePassword(null);
        });
    }

    @Test
    void testEncodePassword_ThrowsExceptionForEmptyPassword() {
        assertThrows(IllegalArgumentException.class, () -> {
            passwordService.encodePassword("   ");
        });
    }
    @Test
    void testPasswordNoStrong_NoUpper() {
        String password = "ToiLaThanhHung123";
        boolean isStrong = passwordService.isPasswordStrong(password);
        assertFalse(isStrong);
    }
    @Test
    void testPasswordNoStrong_NoLower() {
        String password = "HUNGHEO99";
        boolean isStrong = passwordService.isPasswordStrong(password);
        assertFalse(isStrong);
    }
    @Test
    void testPasswordNoStrong_NoDigit() {
        String password = "ToiLaThanhHung";
        boolean isStrong = passwordService.isPasswordStrong(password);
        assertFalse(isStrong);
    }
    @Test
    void testIsPasswordStrong_NoSpecialChar() {
        String password = "ToiLaThanhHung123";
        boolean isStrong = passwordService.isPasswordStrong(password);
        assertFalse(isStrong);
    }
    @Test
    void testEncodingSamePasswordProducesDifferentHashes() {
        String rawPassword = "ToiLaThanhHung123@";
        String encoded1 = passwordService.encodePassword(rawPassword);
        String encoded2 = passwordService.encodePassword(rawPassword);
        assertNotEquals(encoded1, encoded2, "BCrypt should produce different hashes due to salt");
        assertTrue(passwordService.validatePassword(rawPassword, encoded1));
        assertTrue(passwordService.validatePassword(rawPassword, encoded2));
    }
}
