package com.robert.userManagment.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.robert.userManagment.domain.User;

public interface UserRepository extends JpaRepository<User, Long> {
    
}
