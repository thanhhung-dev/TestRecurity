package com.recruitify.model;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "administrative_units")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class AdministrativeUnit {

    @Id
    private Integer id;

    private String full_name;
    private String full_name_en;
    private String short_name;
    private String short_name_en;
    private String code_name;
    private String code_name_en;
}