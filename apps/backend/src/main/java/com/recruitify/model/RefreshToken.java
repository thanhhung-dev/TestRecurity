package com.recruitify.model;


import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import java.time.Instant;

@Entity
@Table(name = "refresh_tokens")
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class RefreshToken {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    @Column(nullable = false, unique = true)
    private String token;

    @Column(nullable = false)
    private Instant expiryDate;

    @Builder.Default
    private boolean isUsed = false;

    @Builder.Default
    private boolean isRevoked = false;

    @ManyToOne // Change from OneToOne to ManyToOne
    @JoinColumn(name = "user_id", referencedColumnName = "id")
    private User user;

    private String replacedByToken;

    private String reasonRevoked;

    @CreationTimestamp
    @Column(updatable = false)
    private Instant createdAt;

    @UpdateTimestamp
    private Instant updatedAt;

    @Transient
    public boolean isExpired() {
        return Instant.now().isAfter(expiryDate);
    }

    @Transient
    public boolean isActive() {
        return !isRevoked && !isExpired() && !isUsed;
    }
}
