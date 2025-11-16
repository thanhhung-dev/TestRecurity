package com.recruitify.services;

public interface IPasswordService {
    String encodePassword(String rawPassword);
    boolean validatePassword(String rawPassword, String encodedPassword);
    boolean isPasswordStrong(String password);
}
