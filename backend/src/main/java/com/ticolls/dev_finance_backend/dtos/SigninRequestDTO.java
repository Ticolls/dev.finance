package com.ticolls.dev_finance_backend.dtos;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;

public class SigninRequestDTO {

    @NotBlank
    private String name;

    @Email
    private String email;

    @Pattern(regexp = "(?=.*[0-9])(?=.*[a-z])(?=\\S+$).{8,}$")
    private String password;

    public SigninRequestDTO() {
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

    public String getPassword() {
        return this.password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

}
