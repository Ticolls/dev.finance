package com.ticolls.dev_finance_backend.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.ticolls.dev_finance_backend.dtos.LoginUserDTO;
import com.ticolls.dev_finance_backend.dtos.SiginUserDTO;
import com.ticolls.dev_finance_backend.services.UserService;

@RestController
@RequestMapping("/user")
public class UserController {

    @Autowired
    UserService service;

    @PostMapping("/sigin")
    public ResponseEntity<String> sigin(@RequestBody SiginUserDTO user) {

        return ResponseEntity.ok("");
    }

    @PostMapping("/login")
    public ResponseEntity<String> login(@RequestBody LoginUserDTO user) {

        return ResponseEntity.ok("");
    }
}
