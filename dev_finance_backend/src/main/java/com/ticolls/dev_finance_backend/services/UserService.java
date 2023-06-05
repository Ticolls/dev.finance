package com.ticolls.dev_finance_backend.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.ticolls.dev_finance_backend.repositories.UserRepository;

@Service
public class UserService {

    @Autowired
    UserRepository repository;

    public void sigin() {
    }

    public void login() {
    }
}
