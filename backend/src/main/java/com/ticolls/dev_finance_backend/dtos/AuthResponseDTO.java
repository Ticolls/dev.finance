package com.ticolls.dev_finance_backend.dtos;

import com.ticolls.dev_finance_backend.entities.User;

public class AuthResponseDTO {
    
    private String token;
    private LoginResponseDTO loginResponseDTO;

    public AuthResponseDTO(String token, User user) {
        this.token = token;
        this.loginResponseDTO = new LoginResponseDTO(user);
    }

    public String getToken() {
        return this.token;
    }

    public void setToken(String token) {
        this.token = token;
    }

    public LoginResponseDTO getLoginResponseDTO() {
        return this.loginResponseDTO;
    }

    public void setLoginResponseDTO(LoginResponseDTO loginResponseDTO) {
        this.loginResponseDTO = loginResponseDTO;
    }

}
