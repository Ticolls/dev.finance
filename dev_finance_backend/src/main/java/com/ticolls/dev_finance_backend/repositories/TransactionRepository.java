package com.ticolls.dev_finance_backend.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.ticolls.dev_finance_backend.entities.Transaction;;

public interface TransactionRepository extends JpaRepository<Transaction, Long> {

}
