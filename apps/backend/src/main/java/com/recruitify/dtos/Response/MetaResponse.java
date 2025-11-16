package com.recruitify.dtos.Response;

import lombok.Data;

@Data
public class MetaResponse {
    private int page;
    private int pageSize;
    private int pages;
    private long total;
}

