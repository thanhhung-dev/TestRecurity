package com.recruitify.model;

import lombok.NoArgsConstructor;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.Instant;
import java.util.List;
import java.util.Set;

@Entity
@Data
@Table(name = "skills")
@AllArgsConstructor
@NoArgsConstructor
public class Skill {
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
    //Relationship
    @ManyToMany(fetch = FetchType.LAZY, mappedBy = "skills")
    @JsonIgnore
    private Set<Job> jobs;
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