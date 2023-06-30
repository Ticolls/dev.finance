package com.ticolls.dev_finance_backend.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import com.ticolls.dev_finance_backend.entities.User;

public interface UserRepository extends JpaRepository<User, Long> {

    User findByEmail(String email);

}
