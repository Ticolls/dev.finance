package com.ticolls.dev_finance_backend.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.stereotype.Service;

import com.ticolls.dev_finance_backend.dtos.AuthResponseDTO;
import com.ticolls.dev_finance_backend.entities.User;
import com.ticolls.dev_finance_backend.infra.security.TokenService;

@Service
public class AuthService {
    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private TokenService tokenService;

    public AuthResponseDTO authenticateUser(String email, String password) {
        var usernamePassword = new UsernamePasswordAuthenticationToken(email, password);

        var auth = this.authenticationManager.authenticate(usernamePassword);

        User user = (User) auth.getPrincipal();
        String token = this.tokenService.generateToken(user);

        AuthResponseDTO authResponseDTO = new AuthResponseDTO(token, user);

        return authResponseDTO;
    }
}
