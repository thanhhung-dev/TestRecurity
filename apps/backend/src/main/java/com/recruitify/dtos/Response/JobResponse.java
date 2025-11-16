package com.recruitify.dtos.Response;
import lombok.Data;
import java.math.BigDecimal;
import java.time.Instant;
import java.util.List;

@Data
public class JobResponse {
    private Long id;
    private String title;
    private String description;
    private String responsibilities;
    private String requirement;
    private BigDecimal salary;
    private String benefit;

    // Company & Related Info
    private String company;
    private String employmentType;
    private String experienceLevel;
    private String category;
    private String location;
    private List<String> skills;

    private Instant createdAt;
    private Instant updatedAt;
    private String createdBy;
    private String updatedBy;
}
