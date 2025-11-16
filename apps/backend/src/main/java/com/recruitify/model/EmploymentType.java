package com.recruitify.model;
import jakarta.persistence.*;
import lombok.Data;

import java.time.Instant;

@Entity
@Table(name = "employment_type")
@Data
public class EmploymentType {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long Id;
    @Column(name = "name")
    private String name;
    @Column(name = "created_at", nullable = false, updatable = false,
            columnDefinition = "TIMESTAMP")
    private Instant createdAt;

    @Column(name = "updated_at", columnDefinition = "TIMESTAMP")
    private Instant updatedAt;

    @Column(name = "deleted_at" , columnDefinition = "TIMESTAMP")
    private Instant deleteAt;

    @Column(length = 100)
    private String createdBy;

    @Column(length = 100)
    private String updatedBy;

    @Column(name = "deleted_by", length = 100)
    private String deleteBy;
    // Calculated property (not stored in database)

    @PrePersist
    protected void onCreate() {
        if (createdBy == null)
        {
            createdBy = "HungThanh";
        }
        if (createdAt == null) {
            createdAt = Instant.now();
        }
        if (updatedAt == null) {
            updatedAt = Instant.now();
        }
    }

    @PreUpdate
    protected void onUpdate() {
        updatedBy = "HungThanh";
        updatedAt = Instant.now();
    }
}
