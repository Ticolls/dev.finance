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
import com.ticolls.dev_finance_backend.dtos.ResponseDTO;
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
    public ResponseEntity<ResponseDTO> create(@Valid @RequestBody RequestTransactionDTO requestTransaction,
            @CookieValue("token") String token) {


        if (requestTransaction.getAmount() == 0) {
            throw new TransactionException(HttpStatus.BAD_REQUEST, "valor da transação deve ser diferente de 0.");
        }

        try {
            ResponseTransactionDTO transactionDTO = transactionService.create(requestTransaction.getDescription(), requestTransaction.getAmount(),
                    requestTransaction.getDate(), token);

            ResponseDTO response = new ResponseDTO(true, "transação criada com sucesso.", transactionDTO);

            return ResponseEntity.ok().body(response);

        } catch (Exception e) {
            throw new TransactionException(HttpStatus.INTERNAL_SERVER_ERROR, e.getMessage());
        }
    }

    @GetMapping
    public ResponseEntity<ResponseDTO> findAll(@CookieValue("token") String token) {

        try {
            List<ResponseTransactionDTO> transactions = transactionService.findAll(token);

            ResponseDTO responseDTO = new ResponseDTO(true, null, transactions);
            return ResponseEntity.ok().body(responseDTO);
        } catch (Exception e) {
            throw new TransactionException(HttpStatus.INTERNAL_SERVER_ERROR, e.getMessage());
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<ResponseDTO> delete(@Positive @PathVariable long id,
            @CookieValue("token") String token) {

        try {
            transactionService.delete(id, token);

            ResponseDTO responseDTO = new ResponseDTO(true, "Transação " + id + " deletada com sucesso.", null);
            return ResponseEntity.ok().body(responseDTO);
        } catch (ResourceException e) {
            throw new TransactionException(HttpStatus.BAD_REQUEST, e.getMessage());
        } catch (Error e) {
            throw new TransactionException(HttpStatus.INTERNAL_SERVER_ERROR, e.getMessage());
        }
    }
}
