package com.ticolls.dev_finance_backend.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.ticolls.dev_finance_backend.dtos.ResponseTransactionDTO;
import com.ticolls.dev_finance_backend.entities.Transaction;
import com.ticolls.dev_finance_backend.entities.User;
import com.ticolls.dev_finance_backend.infra.security.TokenService;
import com.ticolls.dev_finance_backend.repositories.TransactionRepository;
import com.ticolls.dev_finance_backend.repositories.UserRepository;

import org.springframework.transaction.annotation.Transactional;

@Service
public class TransactionService {

    @Autowired
    private TransactionRepository transactionRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private TokenService tokenService;

    @Transactional
    public void create(String description, Double amount, String date, String token) {

        String email = tokenService.validateToken(token);

        User user = userRepository.findByEmail(email);

        Transaction transaction = new Transaction(description, amount, date, user);

        transactionRepository.save(transaction);
    }

    @Transactional
    public List<ResponseTransactionDTO> findAll(String token) {

        String email = tokenService.validateToken(token);

        User user = userRepository.findByEmail(email);

        List<Transaction> data = transactionRepository.findAllByUserId(user.getId());

        List<ResponseTransactionDTO> dtos = data.stream().map(ResponseTransactionDTO::new).toList();

        return dtos;
    }

    @Transactional
    public void delete(long id, String token) {

        String email = tokenService.validateToken(token);

        User user = userRepository.findByEmail(email);

        transactionRepository.deleteByIdByUserId(id, user.getId());
    }
}