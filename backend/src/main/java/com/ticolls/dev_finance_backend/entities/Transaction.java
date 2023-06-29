package com.ticolls.dev_finance_backend.entities;

import com.ticolls.dev_finance_backend.dtos.RequestTransactionDTO;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "transactions")
public class Transaction {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String description;
    private Double amount;
    private String date;

    public Transaction() {
    }

    public Transaction(String description, Double amount, String date) {
        this.description = description;
        this.amount = amount;
        this.date = date;
    }

    public Transaction(RequestTransactionDTO transactionDTO) {
        this.description = transactionDTO.getDescription();
        this.amount = transactionDTO.getAmount();
        this.date = transactionDTO.getDate();
    }

    public Long getId() {
        return this.id;
    }

    public String getDescription() {
        return this.description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public Double getAmount() {
        return this.amount;
    }

    public void setAmount(Double amount) {
        this.amount = amount;
    }

    public String getDate() {
        return this.date;
    }

    public void setDate(String date) {
        this.date = date;
    }

}
