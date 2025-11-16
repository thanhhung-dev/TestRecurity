package com.recruitify.services.impl;

import com.recruitify.services.IPasswordService;
import org.springframework.security.crypto.password.PasswordEncoder;

public class PasswordServiceImpl implements IPasswordService {
    private final PasswordEncoder passwordEncoder;

    public PasswordServiceImpl(PasswordEncoder passwordEncoder) {
        this.passwordEncoder = passwordEncoder;
    }

    @Override
    public String encodePassword(String rawPassword) {
        if (rawPassword == null || rawPassword.trim().isEmpty()) {
            throw new IllegalArgumentException("Password cannot be null or empty");
        }
        return passwordEncoder.encode(rawPassword);
    }

    @Override
    public boolean validatePassword(String rawPassword, String encodedPassword) {
        if (rawPassword == null || encodedPassword == null) {
            return false;
        }

        return passwordEncoder.matches(rawPassword, encodedPassword);
    }

    @Override
    public boolean isPasswordStrong(String password) {
        if (password == null || password.length() < 8) {
            return false;
        }
        boolean hasUpperCase = password.chars().anyMatch(Character::isUpperCase);
        boolean hasLowerCase = password.chars().anyMatch(Character::isLowerCase);
        boolean hasDigit = password.chars().anyMatch(Character::isDigit);
        boolean hasSpecialChar = password.chars().anyMatch(ch ->
                "!@#$%^&*()_+-=[]{}|;:,.<>?".indexOf(ch) >= 0
        );
        return hasUpperCase && hasLowerCase && hasDigit && hasSpecialChar;
    }
}
