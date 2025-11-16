package com.recruitify.controller;

import com.recruitify.dtos.Response.HealthResponse;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.time.LocalDateTime;

@RestController
@RequestMapping("/api/v1/health")
@Tag(name = "System", description = "System health and monitoring endpoints")
public class HealthController {
    @Operation(
            summary = "Health check endpoint",
            description = "Returns API health status. Public endpoint — no authentication required."
    )
    @GetMapping
    public ResponseEntity<HealthResponse> healthCheck() {
        HealthResponse response = HealthResponse.builder()
                .status("UP")
                .timestamp(LocalDateTime.now())
                .version("1.0.0")
                .build();
        return ResponseEntity.ok(response);
    }
}
