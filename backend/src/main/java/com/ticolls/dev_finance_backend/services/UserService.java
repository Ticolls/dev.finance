package com.ticolls.dev_finance_backend.services;

import java.util.List;
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
        List<User> users = repository.findAll();

        boolean userExist = false;

        for (int i = 0; i < users.size(); i++) {
            if (users.get(i).getEmail().equals(user.getEmail())) {
                userExist = true;
            }
        }

        if (userExist) {
            throw new Error("Email já cadastrado");
        } else {
            repository.create(user.getName(), user.getEmail(), user.getPassword());
        }

    }

    public void login() {
    }
}
