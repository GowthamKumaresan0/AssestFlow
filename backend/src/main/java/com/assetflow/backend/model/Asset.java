package com.assetflow.backend.model;

import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDate;
import java.time.LocalDateTime;

@Entity
@Table(name = "assets")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Asset {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String name;

    @Column(unique = true, nullable = false)
    private String serialNumber;

    private String type;
    private String location;

    @Enumerated(EnumType.STRING)
    @Column(length = 20)
    private AssetStatus status;

    @Column(name = "failure_probability")
    private Double failureProbability;

    private LocalDate purchaseDate;

    @Column(updatable = false)
    private LocalDateTime createdAt;

    @PrePersist
    protected void onCreate() {
        createdAt = LocalDateTime.now();
    }
}
