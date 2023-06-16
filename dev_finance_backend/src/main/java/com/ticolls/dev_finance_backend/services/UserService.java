package com.ticolls.dev_finance_backend.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.ticolls.dev_finance_backend.entities.User;
import com.ticolls.dev_finance_backend.repositories.UserRepository;

import jakarta.transaction.Transactional;

@Service
public class UserService {

    @Autowired
    UserRepository repository;

    @Transactional
    public void sigin(User user) {
        repository.create(user.getName(), user.getEmail(), user.getPassword());
    }

    public void login() {
    }
}
