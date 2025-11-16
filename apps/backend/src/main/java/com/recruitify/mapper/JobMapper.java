package com.recruitify.mapper;

import com.recruitify.dtos.Response.JobResponse;
import com.recruitify.model.*;
import org.mapstruct.*;
import java.util.Collections;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Mapper(componentModel = "spring")
public interface JobMapper {

    @Mapping(target = "company", expression = "java(mapCompanyName(job))")
    @Mapping(target = "employmentType", expression = "java(mapEmploymentTypeName(job))")
    @Mapping(target = "experienceLevel", expression = "java(mapExperienceLevelName(job))")
    @Mapping(target = "category", expression = "java(mapCategoryName(job))")
    @Mapping(target = "location", expression = "java(mapLocation(job))")
    @Mapping(target = "skills", expression = "java(mapSkills(job))")
    JobResponse toResponseJob(Job job);

    default List<JobResponse> toResponseJobList(List<Job> jobs) {
        if (jobs == null || jobs.isEmpty()) {
            return Collections.emptyList();
        }
        return jobs.stream()
                .map(this::toResponseJob)
                .collect(Collectors.toList());
    }

    // Helper methods
    default String mapCompanyName(Job job) {
        return Optional.ofNullable(job.getCompany())
                .map(Company::getName)
                .orElse("Unknown");
    }

    default String mapEmploymentTypeName(Job job) {
        return Optional.ofNullable(job.getEmploymentType())
                .map(EmploymentType::getName)
                .orElse("Unknown");
    }

    default String mapExperienceLevelName(Job job) {
        return Optional.ofNullable(job.getExperienceLevel())
                .map(ExperienceLevel::getName)
                .orElse("Unknown");
    }

    default String mapCategoryName(Job job) {
        return Optional.ofNullable(job.getCategory())
                .map(Category::getName)
                .orElse("Unknown");
    }

    default String mapLocation(Job job) {
        return Optional.ofNullable(job.getWard())
                .map(ward -> {
                    String wardName = ward.getFullName();
                    String provinceName = Optional.ofNullable(ward.getProvince())
                            .map(Province::getFullName)
                            .orElse("");
                    return wardName + ", " + provinceName;
                })
                .orElse("Unknown");
    }

    default List<String> mapSkills(Job job) {
        return job.getSkills() == null ?
                Collections.emptyList() :
                job.getSkills().stream()
                        .map(Skill::getName)
                        .collect(Collectors.toList());
    }
}
