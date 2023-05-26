package com.ticolls.dev_finance_backend.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.ticolls.dev_finance_backend.dtos.TransactionDTO;
import com.ticolls.dev_finance_backend.entities.Transaction;
import com.ticolls.dev_finance_backend.repositories.TransactionRepository;

import jakarta.transaction.Transactional;

@Service
public class TransactionService {

    @Autowired
    private TransactionRepository repository;

    @Transactional
    public void createTransaction(Transaction transaction) {
        repository.create(transaction);
    }

    public List<TransactionDTO> findAll() {
        List<Transaction> data = repository.findAll();
        List<TransactionDTO> dtos = data.stream().map(TransactionDTO::new).toList();

        return dtos;
    }
}
