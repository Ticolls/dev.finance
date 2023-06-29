package com.ticolls.dev_finance_backend.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.ticolls.dev_finance_backend.dtos.ResponseTransactionDTO;
import com.ticolls.dev_finance_backend.entities.Transaction;
import com.ticolls.dev_finance_backend.entities.User;
import com.ticolls.dev_finance_backend.repositories.TransactionRepository;
import com.ticolls.dev_finance_backend.repositories.UserRepository;

import org.springframework.transaction.annotation.Transactional;

@Service
public class TransactionService {

    @Autowired
    private TransactionRepository transactionRepository;

    @Autowired
    private UserRepository userRepository;

    @Transactional
    public void create(String description, Double amount, String date, Long userId) {

        User user = userRepository.findById(userId).get();

        Transaction transaction = new Transaction(description, amount, date, user);

        transactionRepository.save(transaction);
    }

    @Transactional
    public List<ResponseTransactionDTO> findAll() {
        List<Transaction> data = transactionRepository.findAll();

        List<ResponseTransactionDTO> dtos = data.stream().map(ResponseTransactionDTO::new).toList();

        return dtos;
    }

    @Transactional
    public void delete(long id) {
        transactionRepository.deleteById(id);
    }
}
