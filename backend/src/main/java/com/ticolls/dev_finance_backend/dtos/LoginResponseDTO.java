package com.ticolls.dev_finance_backend.dtos;

public class LoginResponseDTO {
    private String token;

    public LoginResponseDTO(String token) {
        this.token = token;
    }

    public String getToken() {
        return this.token;
    }
}
