package com.ticolls.dev_finance_backend.exceptions;

import org.springframework.http.HttpStatus;

public class UserException extends RuntimeException {

    private HttpStatus httpStatus = HttpStatus.INTERNAL_SERVER_ERROR;
    
    public UserException(String msg) {
        super(msg);
    }

    public HttpStatus getHttpStatus() {
        return this.httpStatus;
    }
}
