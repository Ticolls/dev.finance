package com.ticolls.dev_finance_backend.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import com.ticolls.dev_finance_backend.entities.User;
import com.ticolls.dev_finance_backend.exceptions.EmailException;
import com.ticolls.dev_finance_backend.repositories.UserRepository;

import jakarta.transaction.Transactional;

@Service
public class UserService implements UserDetailsService {

    @Autowired
    private UserRepository repository;

    @Transactional
    public void save(String name, String email, String password) {

        if (this.repository.findByEmail(email) != null) {
            throw new EmailException("Email já cadastrado");
        } 

        try {
            String encryptedPassword = new BCryptPasswordEncoder().encode(password);
            User newUser = new User(name, email, encryptedPassword);
            repository.save(newUser);
        } catch (Error e) {
            
        }


        
    }

    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        return repository.findByEmail(email);
    }

}
