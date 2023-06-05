package com.ticolls.dev_finance_backend.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import com.ticolls.dev_finance_backend.dtos.TransactionDTO;
import com.ticolls.dev_finance_backend.services.TransactionService;

import jakarta.validation.ConstraintViolationException;
import jakarta.validation.Valid;
import jakarta.validation.constraints.Positive;

@RestController
@RequestMapping("/transaction")
@Validated
public class TransactionController {

    @Autowired
    private TransactionService service;

    @PostMapping
    public ResponseEntity<String> create(@Valid @RequestBody TransactionDTO body) {
        service.create(body.getDescription(), body.getAmount(), body.getDate());

        if (body.getAmount() == 0) {
            return new ResponseEntity<>("not valid due to validation error: valor deve ser diferente de 0",
                    HttpStatus.BAD_REQUEST);
        }

        return ResponseEntity.ok("Transação criada");
    }

    @GetMapping
    public List<TransactionDTO> findAll() {
        List<TransactionDTO> result = service.findAll();

        return result;
    }

    @DeleteMapping("/{id}")
    public String delete(@Positive @PathVariable long id) {
        System.out.println(id);
        service.delete(id);

        return "ta batendo";
    }

    @ExceptionHandler(ConstraintViolationException.class)
    @ResponseStatus(HttpStatus.BAD_REQUEST)
    ResponseEntity<String> handleConstraintViolationException(ConstraintViolationException e) {
        return new ResponseEntity<>("not valid due to validation error: " + e.getMessage(), HttpStatus.BAD_REQUEST);
    }
}
