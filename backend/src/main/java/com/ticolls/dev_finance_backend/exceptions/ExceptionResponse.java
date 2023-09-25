package com.ticolls.dev_finance_backend.exceptions;

public class ExceptionResponse {
    private String message;

    public ExceptionResponse(String message) {
        this.message = message;
    }

    public String getMessage() {
        return this.message;
    }

    public void setMessage(String message) {
        this.message = message;
    }
}
