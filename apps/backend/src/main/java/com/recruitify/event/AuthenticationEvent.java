package com.recruitify.event;

import org.springframework.context.ApplicationEvent;

import java.time.Clock;

public class AuthenticationEvent extends ApplicationEvent {
    private final String email;
    private final AuthEventType eventType;
    private final String message;
    private final String ipAddress;
    public AuthenticationEvent(Object source, String email, AuthEventType eventType, String message, String ipAddress) {
        super(source);
        this.email = email;
        this.eventType = eventType;
        this.message = message;
        this.ipAddress = ipAddress;
    }


    public enum AuthEventType {
        LOGIN_SUCCESS,
        LOGIN_FAILED,
        LOGOUT,
        REGISTER_SUCCESS,
        REFRESH_TOKEN,
        INVALID_TOKEN,
        ACCOUNT_LOCKED
    }
}
