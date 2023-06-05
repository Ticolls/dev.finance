package com.ticolls.dev_finance_backend.dtos;

import com.ticolls.dev_finance_backend.entities.User;

public class ResponseUserDTO {

    private Long id;
    private String email;
    private String name;
    private String password;

    public ResponseUserDTO() {
    }

    public ResponseUserDTO(User user) {
        this.id = user.getId();
        this.email = user.getEmail();
        this.name = user.getEmail();
        this.password = user.getPassword();
    }

    public Long getId() {
        return this.id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getEmail() {
        return this.email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getName() {
        return this.name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getPassword() {
        return this.password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

}
