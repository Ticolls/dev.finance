package com.ticolls.dev_finance_backend.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.ticolls.dev_finance_backend.entities.Transaction;

public interface TransactionRepository extends JpaRepository<Transaction, Long> {

    List<Transaction> findAllByUserId(Long userId);

}
