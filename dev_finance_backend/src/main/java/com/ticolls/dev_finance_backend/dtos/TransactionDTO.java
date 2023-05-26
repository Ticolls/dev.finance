package com.ticolls.dev_finance_backend.dtos;

import com.ticolls.dev_finance_backend.entities.Transaction;

public class TransactionDTO {
    private String description;
    private Double amount;
    private String date;

    public TransactionDTO(Transaction transaction) {
        this.description = transaction.getDescription();
        this.amount = transaction.getAmount();
        this.date = transaction.getDate();
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
