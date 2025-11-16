package com.recruitify.dtos.Response;

import lombok.Data;

@Data
public class ResultPaginationResponse {
    private MetaResponse meta;
    private Object result;
}