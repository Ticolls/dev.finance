package com.ticolls.dev_finance_backend.controllers;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.ticolls.dev_finance_backend.dtos.CreateTransactionDTO;

@RestController
@RequestMapping("/transaction")
public class TransactionController {

    @PostMapping
    public void createTransaction(@RequestBody CreateTransactionDTO body) {

    }
}
