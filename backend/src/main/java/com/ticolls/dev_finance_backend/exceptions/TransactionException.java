package com.ticolls.dev_finance_backend.exceptions;

import org.springframework.http.HttpStatus;

public class TransactionException extends RuntimeException {
    
    private HttpStatus httpStatus = HttpStatus.INTERNAL_SERVER_ERROR;

    public TransactionException(HttpStatus httpStatus, String message){
        super(message);
        this.httpStatus = httpStatus;
    }

    public HttpStatus getHttpStatus() {
        return this.httpStatus;
    }
}
