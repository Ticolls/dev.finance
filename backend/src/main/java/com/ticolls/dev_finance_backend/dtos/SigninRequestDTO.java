package com.ticolls.dev_finance_backend.dtos;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;

public class SigninRequestDTO {

    @NotBlank(message = "O nome é obrigatório.")
    private String name;

    @Email(message = "Email inválido.")
    private String email;

    @Pattern(regexp = "(?=.*[0-9])(?=.*[a-z])(?=\\S+$).{8,}$", 
    message = "A senha deve conter 8 caracteres, pelo menos uma letra minúscula e um número")
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
