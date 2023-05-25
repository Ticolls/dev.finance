package com.ticolls.dev_finance_backend.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.ticolls.dev_finance_backend.repositories.TransactionRepository;

@Service
public class TransactionService {

    @Autowired
    private TransactionRepository repository;
}
