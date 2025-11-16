package com.recruitify.exceptions;

import org.springframework.security.core.AuthenticationException;

public class AccountDeactivatedException extends AuthenticationException {

    public AccountDeactivatedException(String message) {
        super(message);
    }

    public AccountDeactivatedException(String message, Throwable cause) {
        super(message, cause);
    }
}