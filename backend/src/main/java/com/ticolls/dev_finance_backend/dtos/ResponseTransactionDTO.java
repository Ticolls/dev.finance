package com.ticolls.dev_finance_backend.dtos;

import com.ticolls.dev_finance_backend.entities.Transaction;

import jakarta.validation.constraints.NotBlank;

public class ResponseTransactionDTO {
    private Long id;

    private String description;

    private Double amount;
    @NotBlank
    private String date;

    private Long userId;

    public ResponseTransactionDTO() {
    }

    public ResponseTransactionDTO(Transaction transaction) {
        this.id = transaction.getId();
        this.description = transaction.getDescription();
        this.amount = transaction.getAmount();
        this.date = transaction.getDate();
        this.userId = transaction.getUser().getId();
    }

    public Long getUserId() {
        return this.userId;
    }

    public void setUserId(Long userId) {
        this.userId = userId;
    }

    public Long getId() {
        return this.id;
    }

    public void setId(Long id) {
        this.id = id;
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
