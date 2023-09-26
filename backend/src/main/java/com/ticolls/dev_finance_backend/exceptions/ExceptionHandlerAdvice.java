package com.ticolls.dev_finance_backend.exceptions;

import java.util.Map;
import java.util.HashMap;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.context.support.DefaultMessageSourceResolvable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

import com.ticolls.dev_finance_backend.dtos.ResponseDTO;

@ControllerAdvice
public class ExceptionHandlerAdvice { 

    @ExceptionHandler(TransactionException.class)
    public ResponseEntity<ResponseDTO> handleTransactionException(TransactionException e) {
        ResponseDTO exceptionResponse = new ResponseDTO(false, e.getMessage(), null);
        return ResponseEntity.status(e.getHttpStatus()).body(exceptionResponse);
    }
    
    @ExceptionHandler(UserException.class)
    public ResponseEntity<ResponseDTO> handleUserException(UserException e) {
        ResponseDTO exceptionResponse = new ResponseDTO(false, e.getMessage(), null);
        return ResponseEntity.status(e.getHttpStatus()).body(exceptionResponse);
    }
    
    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<ResponseDTO> handleMethodArgumentNotValid(MethodArgumentNotValidException ex) {
        Map<String, List<String>> body = new HashMap<>();
    
        List<String> errors = ex.getBindingResult()
            .getFieldErrors()
            .stream()
            .map(DefaultMessageSourceResolvable::getDefaultMessage)
            .collect(Collectors.toList());
        
        body.put("errors", errors);


        ResponseDTO exceptionResponse = new ResponseDTO(false, "formulário inválido.", errors);
        
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(exceptionResponse);
  }
}
