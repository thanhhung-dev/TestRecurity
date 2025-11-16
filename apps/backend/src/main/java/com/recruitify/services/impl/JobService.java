package com.recruitify.services.impl;

import com.recruitify.dtos.Response.JobResponse;
import com.recruitify.dtos.Response.ResultPaginationResponse;
import com.recruitify.mapper.JobMapper;
import com.recruitify.model.Job;
import com.recruitify.repository.IJobRepository;
import com.recruitify.services.IJobService;
import com.recruitify.utils.FormatResultPagaination;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;


import java.util.List;

@Service
public class JobService implements IJobService {
    private final IJobRepository jobRepository;
    private final JobMapper jobMapper;
    public JobService(IJobRepository jobRepository, JobMapper jobMapper) {
        this.jobRepository = jobRepository;
        this.jobMapper = jobMapper;
    }


    @Override
    public ResultPaginationResponse fetchAllJob(Pageable pageable) {
        Page<Job> jobPage = jobRepository.findAll(pageable);
        Page<JobResponse> jobResponsePage = jobPage.map(jobMapper::toResponseJob);
        ResultPaginationResponse response = FormatResultPagaination.createPaginationResponse(jobResponsePage);
        return response;
    }
}
