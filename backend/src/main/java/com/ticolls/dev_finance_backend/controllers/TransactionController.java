package com.ticolls.dev_finance_backend.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.ticolls.dev_finance_backend.dtos.RequestTransactionDTO;
import com.ticolls.dev_finance_backend.dtos.ResponseTransactionDTO;
import com.ticolls.dev_finance_backend.services.TransactionService;

import jakarta.validation.Valid;
import jakarta.validation.constraints.Positive;

@RestController
@RequestMapping("/transaction")
@Validated
public class TransactionController {

    @Autowired
    private TransactionService transactionService;

    @PostMapping
    public ResponseEntity<String> create(@Valid @RequestBody RequestTransactionDTO transactionDTO,
            @RequestHeader(name = "Authorization") String token) {

        if (transactionDTO.getAmount() == 0) {
            return new ResponseEntity<>("not valid due to validation error: valor deve ser diferente de 0",
                    HttpStatus.BAD_REQUEST);
        }

        try {
            transactionService.create(transactionDTO.getDescription(), transactionDTO.getAmount(),
                    transactionDTO.getDate(),
                    token);
            return ResponseEntity.ok("Transação criada com sucesso.");

        } catch (Exception e) {
            return new ResponseEntity<>("Erro na criação da transação.", null, HttpStatus.BAD_REQUEST);
        }

    }

    @GetMapping
    public ResponseEntity<List<ResponseTransactionDTO>> findAll(@RequestHeader(name = "Authorization") String token) {

        try {
            List<ResponseTransactionDTO> result = transactionService.findAll(token);
            return ResponseEntity.ok(result);
        } catch (Exception e) {
            return new ResponseEntity<>(null, null, HttpStatus.BAD_REQUEST);
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> delete(@Positive @PathVariable long id,
            @RequestHeader(name = "Authorization") String token) {

        try {
            transactionService.delete(id, token);
            return ResponseEntity.ok("Transação " + id + "deletada com sucesso.");
        } catch (Exception e) {
            return new ResponseEntity<String>("Não foi possível deletar a transação " + id, null,
                    HttpStatus.BAD_REQUEST);
        }

    }
}
