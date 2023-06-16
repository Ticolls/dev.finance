package com.ticolls.dev_finance_backend.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;

import com.ticolls.dev_finance_backend.entities.User;

public interface UserRepository extends JpaRepository<User, Long> {

    @Modifying
    @Query(nativeQuery = true, value = """
            INSERT INTO users(
                name,
                email,
                password
            ) VALUES (
                :name,
                :email,
                :password
            )
            """)
    void create(String name, String email, String password);
}
