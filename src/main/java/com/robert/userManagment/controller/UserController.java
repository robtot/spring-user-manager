package com.robert.userManagment.controller;

import org.springframework.web.bind.annotation.RestController;

import com.robert.userManagment.domain.User;
import com.robert.userManagment.repository.UserRepository;

import java.net.URI;
import java.net.URISyntaxException;
import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;

@RestController
@RequestMapping("/users")
public class UserController {
    private final UserRepository repository;

    public UserController(UserRepository repository) {
        this.repository = repository;
    }

    @GetMapping
    public List<User> getUsers() {
        return repository.findAll();
    }

    @GetMapping("/{id}")
    public User getUser(@PathVariable Long id) {
        return repository.findById(id).orElseThrow();
    }

    @PostMapping
    public ResponseEntity<User> createUser(@RequestBody User user) throws URISyntaxException {
        User savedUser = repository.save(user);
        return ResponseEntity.created(new URI("/users/" + savedUser.getId())).body(savedUser);
    }

    @PutMapping("/{id}")
    public ResponseEntity<User> updateUser(@PathVariable Long id, @RequestBody User user) {
        User currentUser = repository.findById(id).orElseThrow();
        currentUser.setName(user.getName());
        currentUser.setEmail(user.getEmail());
        currentUser.setUsername(user.getUsername());
        currentUser.setPhone(user.getPhone());
        currentUser.setWebsite(user.getWebsite());
        currentUser.setCompany(user.getCompany());
        currentUser.setAddress(user.getAddress());
        currentUser = repository.save(currentUser);

        return ResponseEntity.ok(currentUser);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteUser(@PathVariable Long id) {
        repository.deleteById(id);
        return ResponseEntity.ok().build();
    } 
}
