package com.recruitify.repository;

import com.recruitify.model.Role;
import com.recruitify.model.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface IRoleRepository extends JpaRepository<Role, Long> {
    Optional<Role> findByName(String name);
}
