package com.ticolls.dev_finance_backend.dtos;

import jakarta.validation.constraints.NotBlank;

public class RequestTransactionDTO {

@NotBlank(message = "A descrição é obrigatória.")
    private String description;

    private Double amount;
    private String date;

    public RequestTransactionDTO() {
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
