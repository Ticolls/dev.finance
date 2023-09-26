package com.ticolls.dev_finance_backend.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.CookieValue;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.ticolls.dev_finance_backend.dtos.RequestTransactionDTO;
import com.ticolls.dev_finance_backend.dtos.ResponseTransactionDTO;
import com.ticolls.dev_finance_backend.exceptions.ResourceException;
import com.ticolls.dev_finance_backend.exceptions.TransactionException;
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
    public ResponseEntity<ResponseTransactionDTO> create(@Valid @RequestBody RequestTransactionDTO requestTransaction,
            @CookieValue("token") String token) {


        if (requestTransaction.getAmount() == 0) {
            throw new TransactionException(HttpStatus.BAD_REQUEST, "valor da transação deve ser diferente de 0.");
        }

        try {
            ResponseTransactionDTO transactionDTO = transactionService.create(requestTransaction.getDescription(), requestTransaction.getAmount(),
                    requestTransaction.getDate(), token);
            return ResponseEntity.ok().body(transactionDTO);

        } catch (Exception e) {
            throw new TransactionException(HttpStatus.INTERNAL_SERVER_ERROR, e.getMessage());
        }
    }

    @GetMapping
    public ResponseEntity<List<ResponseTransactionDTO>> findAll(@CookieValue("token") String token) {

        try {
            List<ResponseTransactionDTO> result = transactionService.findAll(token);
            return ResponseEntity.ok().body(result);
        } catch (Exception e) {
            throw new TransactionException(HttpStatus.INTERNAL_SERVER_ERROR, e.getMessage());
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> delete(@Positive @PathVariable long id,
            @CookieValue("token") String token) {

        try {
            transactionService.delete(id, token);
            return ResponseEntity.ok().body("Transação " + id + " deletada com sucesso.");
        } catch (ResourceException e) {
            throw new TransactionException(HttpStatus.BAD_REQUEST, e.getMessage());
        } catch (Error e) {
            throw new TransactionException(HttpStatus.INTERNAL_SERVER_ERROR, e.getMessage());
        }
    }
}
