package com.ticolls.dev_finance_backend.dtos;

import com.ticolls.dev_finance_backend.entities.User;

public class LoginResponseDTO {

    private String name;
    private String email;

    public LoginResponseDTO(User user) {
        this.name = user.getName();
        this.email = user.getEmail();
    }

    public String getEmail() {
        return this.email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getName() {
        return this.name;
    }

    public void setName(String name) {
        this.name = name;
    }

}
