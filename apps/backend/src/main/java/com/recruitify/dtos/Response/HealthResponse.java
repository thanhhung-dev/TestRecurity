package com.recruitify.dtos.Response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
@AllArgsConstructor
@NoArgsConstructor
@Data
@Builder
public class HealthResponse {
    private String status;
    private LocalDateTime timestamp;
    private String version;
    private String service;
}
