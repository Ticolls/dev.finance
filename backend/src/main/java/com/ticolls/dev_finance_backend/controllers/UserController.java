package com.ticolls.dev_finance_backend.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.ticolls.dev_finance_backend.dtos.LoginRequestDTO;
import com.ticolls.dev_finance_backend.dtos.LoginResponseDTO;
import com.ticolls.dev_finance_backend.dtos.SigninRequestDTO;
import com.ticolls.dev_finance_backend.exceptions.EmailException;
import com.ticolls.dev_finance_backend.exceptions.UserException;
import com.ticolls.dev_finance_backend.services.AuthService;
import com.ticolls.dev_finance_backend.services.UserService;

import jakarta.validation.Valid;

@RestController
@RequestMapping("auth")
public class UserController {

    @Autowired
    private UserService userService;

    @Autowired
    private AuthService authService;

    @PostMapping("/signin")
    public ResponseEntity<String> signin(@Valid @RequestBody SigninRequestDTO userDTO) {

        try {
            userService.save(userDTO.getName(), userDTO.getEmail(), userDTO.getPassword());
            return ResponseEntity.ok().body("Usuário criado com sucesso!");
        } catch (EmailException e) {
            throw new UserException(HttpStatus.BAD_REQUEST, e.getMessage());
        } catch (Exception e) {
            throw new UserException(HttpStatus.INTERNAL_SERVER_ERROR, e.getMessage());
        }

    }

    @PostMapping("/login")
    public ResponseEntity<LoginResponseDTO> login(@Valid @RequestBody LoginRequestDTO userDTO) {

        try {
            String token = authService.authenticateUser(userDTO.getEmail(), userDTO.getPassword());
            return ResponseEntity.ok().body(new LoginResponseDTO(token));
        } catch (Exception e) {
            throw new UserException(HttpStatus.UNAUTHORIZED, "Email ou senha inválido.");
        }

    }
}
