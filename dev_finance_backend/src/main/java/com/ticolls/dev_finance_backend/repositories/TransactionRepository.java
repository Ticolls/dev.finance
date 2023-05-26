package com.ticolls.dev_finance_backend.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.ticolls.dev_finance_backend.entities.Transaction;;

public interface TransactionRepository extends JpaRepository<Transaction, Long> {

    @Query(nativeQuery = true, value = """
            INSERT INTO transactions(
                description,
                amount,
                date
            ) VALUES(
                ":description",
                :amount,
                ":date"
            )
                """)
    void create(String description, Double amount, String date);

    @Query(nativeQuery = true, value = """
            SELECT * FROM transactions
            """)
    List<Transaction> findAll();
}
