package com.ticolls.dev_finance_backend.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.ticolls.dev_finance_backend.dtos.TransactionDTO;
import com.ticolls.dev_finance_backend.services.TransactionService;

@RestController
@RequestMapping("/transaction")
public class TransactionController {

    @Autowired
    private TransactionService service;

    @PostMapping
    public void create(@RequestBody TransactionDTO body) {
        service.create(body.getDescription(), body.getAmount(), body.getDate());
    }

    @GetMapping
    public List<TransactionDTO> findAll() {
        List<TransactionDTO> result = service.findAll();

        return result;
    }
}
