package com.recruitify.repository;

import com.recruitify.model.Job;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;

import java.awt.print.Pageable;

public interface IJobRepository extends JpaRepository<Job,Long>, JpaSpecificationExecutor<Job> {
}
