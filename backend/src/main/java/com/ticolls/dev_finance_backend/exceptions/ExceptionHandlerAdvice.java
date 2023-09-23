package com.ticolls.dev_finance_backend.exceptions;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

@ControllerAdvice
public class ExceptionHandlerAdvice { 

    @ExceptionHandler(TransactionException.class)
    public ResponseEntity<?> handleTransactionException(TransactionException e) {
        return ResponseEntity.status(e.getHttpStatus()).body(e.getMessage());
    }
    
    @ExceptionHandler(UserException.class)
    public ResponseEntity<?> handleUserException(UserException e) {
        return ResponseEntity.status(e.getHttpStatus()).body(e.getMessage());
    }  
}
