package com.ticolls.dev_finance_backend.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;

import com.ticolls.dev_finance_backend.entities.Transaction;

public interface TransactionRepository extends JpaRepository<Transaction, Long> {

    List<Transaction> findAllByUserId(Long userId);

    @Modifying
    @Query(nativeQuery = true, value = "DELETE  FROM transactions WHERE id = :transactionId AND user_id = :userId")
    void deleteByIdByUserId(Long transactionId, long userId);
}
