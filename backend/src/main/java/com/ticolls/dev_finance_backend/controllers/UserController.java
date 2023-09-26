package com.ticolls.dev_finance_backend.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.ticolls.dev_finance_backend.dtos.AuthResponseDTO;
import com.ticolls.dev_finance_backend.dtos.LoginRequestDTO;
import com.ticolls.dev_finance_backend.dtos.LoginResponseDTO;
import com.ticolls.dev_finance_backend.dtos.SignupRequestDTO;
import com.ticolls.dev_finance_backend.exceptions.EmailException;
import com.ticolls.dev_finance_backend.exceptions.UserException;
import com.ticolls.dev_finance_backend.services.AuthService;
import com.ticolls.dev_finance_backend.services.UserService;

import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.validation.Valid;

@RestController
@RequestMapping("auth")
public class UserController {

    @Autowired
    private UserService userService;

    @Autowired
    private AuthService authService;

    @PostMapping("/signup")
    public ResponseEntity<String> signup(@Valid @RequestBody SignupRequestDTO userDTO) {

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
    public ResponseEntity<LoginResponseDTO> login(@Valid @RequestBody LoginRequestDTO userDTO, HttpServletResponse response) {

        try {
            AuthResponseDTO authResponseDTO = authService.authenticateUser(userDTO.getEmail(), userDTO.getPassword());

            String token = authResponseDTO.getToken();
            LoginResponseDTO loginResponseDTO = authResponseDTO.getLoginResponseDTO();

            Cookie cookie = new Cookie("token", token);

            // expires in 1 day
            cookie.setMaxAge( 24 * 60 * 60);
            cookie.setHttpOnly(true);
            cookie.setPath("/");
            response.addCookie(cookie);

            return ResponseEntity.ok().body(loginResponseDTO);

        } catch (Exception e) {
            throw new UserException(HttpStatus.UNAUTHORIZED, "Email ou senha inválido.");
        }

    }
}
