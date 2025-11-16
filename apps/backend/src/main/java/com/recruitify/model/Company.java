package com.recruitify.model;
import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.Data;

import java.time.Instant;
import java.util.List;

@Entity
@Data
@Table(name = "company")
public class Company {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "name")
    private String name;

    @Column(name = "overview", columnDefinition = "TEXT")
    private String overview;

    @Column(name = "image")
    private String image;

    @Column(name = "phone")
    private String phone;

    @Column(name = "industry")
    private String industry;

    @Column(name = "company_type")
    private String companyType;

    @Column(name = "company_size")
    private String companySize;

    @Column(name = "founder_year")
    private Integer founderYear;
    //Relationship
    @Column(name = "created_at", nullable = false, updatable = false,
            columnDefinition = "TIMESTAMP")
    private Instant createdAt;

    @Column(name = "updated_at", columnDefinition = "TIMESTAMP")
    private Instant updatedAt;

    @Column(length = 100)
    private String createdBy;

    @Column(length = 100)
    private String updatedBy;
    @Column(columnDefinition = "TIMESTAMP")
    private Instant deleteAt;

    @Column(length = 100)
    private String deleteBy;

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