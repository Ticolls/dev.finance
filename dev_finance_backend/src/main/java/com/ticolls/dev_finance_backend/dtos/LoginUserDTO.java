package com.ticolls.dev_finance_backend.dtos;

public class LoginUserDTO {

    private String email;
    private String password;

    public LoginUserDTO() {
    }

    public String getEmail() {
        return this.email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPassword() {
        return this.password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

}
