package com.ticolls.dev_finance_backend.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.ticolls.dev_finance_backend.dtos.LoginUserDTO;
import com.ticolls.dev_finance_backend.dtos.SigninUserDTO;
import com.ticolls.dev_finance_backend.entities.User;
import com.ticolls.dev_finance_backend.services.UserService;

@RestController
@RequestMapping("/user")
public class UserController {

    @Autowired
    UserService service;

    @PostMapping("/signin")
    public ResponseEntity<String> sigin(@RequestBody SigninUserDTO userDTO) {
        
        User user = new User(userDTO);

        service.sigin(user);

        return ResponseEntity.ok("");
    }

    @PostMapping("/login")
    public ResponseEntity<String> login(@RequestBody LoginUserDTO userDTO) {

        return ResponseEntity.ok("");
    }
}
