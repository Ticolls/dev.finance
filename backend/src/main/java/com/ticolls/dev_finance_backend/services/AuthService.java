package com.ticolls.dev_finance_backend.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.stereotype.Service;

import com.ticolls.dev_finance_backend.entities.User;
import com.ticolls.dev_finance_backend.infra.security.TokenService;

@Service
public class AuthService {
    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private TokenService tokenService;

    public String authenticateUser(String email, String password) {
        var usernamePassword = new UsernamePasswordAuthenticationToken(email, password);

        var auth = this.authenticationManager.authenticate(usernamePassword);

        String token = this.tokenService.generateToken((User) auth.getPrincipal());

        return token;
    }
}
