package com.recruitify.model;


import jakarta.persistence.*;
import lombok.Data;
import java.math.BigDecimal;
import java.time.Instant;
import java.util.Set;

@Entity
@Table(name = "job")
@Data
public class Job {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column( updatable = false, nullable = false)
    private Long id;

    @Column( length = 255, nullable = false)
    private String title;

    @Column( columnDefinition = "TEXT")
    private String description;

    @Column(columnDefinition = "TEXT")
    private String responsibilities;
    @Column( columnDefinition = "TEXT")
    private String requirement;

    @Column(precision = 10, scale = 2)
    private BigDecimal salary;

    @Column(columnDefinition = "TEXT")
    private String benefit;
    //Relationship
    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "company_id")
    private Company company;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "employment_type_id")
    private EmploymentType employmentType;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "experience_level_id")
    private ExperienceLevel experienceLevel;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "work_approach_id")
    private WorkApproach workApproach;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "category_id")
    private Category category;

    @ManyToMany(fetch = FetchType.LAZY)
    @JoinTable(
            name = "job_skill",
            joinColumns = @JoinColumn(name = "job_id"),
            inverseJoinColumns = @JoinColumn(name = "skill_id")
    )
    private Set<Skill> skills;

    @ManyToOne
    @JoinColumn(name = "ward_code")
    private Ward ward;

    //Common
    @Column(name = "created_at", nullable = false, updatable = false,
            columnDefinition = "TIMESTAMP")
    private Instant createdAt;

    @Column(name = "updated_at", columnDefinition = "TIMESTAMP")
    private Instant updatedAt;

    @Column(name = "created_by", length = 100)
    private String createdBy;

    @Column(name = "updated_by", length = 100)
    private String updatedBy;

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