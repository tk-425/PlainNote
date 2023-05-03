package com.tilbackend.tilbackend.controller;

import com.tilbackend.tilbackend.document.Note;
import com.tilbackend.tilbackend.document.User;
import com.tilbackend.tilbackend.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;
import java.util.Optional;

@CrossOrigin("http://localhost:3000")
@RestController
@RequestMapping("/api/v1/user")
public class UserController {

  private final UserService userService;

  @Autowired
  public UserController(UserService userService) {
    this.userService = userService;
  }

  @PostMapping
  public ResponseEntity<User> createUser(@RequestBody Map<String, String> payload) {

    return new ResponseEntity<>(userService.createUser(
        payload.get("userId"), payload.get("email")),
        HttpStatus.CREATED);
  }

  @GetMapping("/notes/{userId}")
  public ResponseEntity<List<Note>> getNotesById(@PathVariable String userId) {

    Optional<List<Note>> notes = userService.getNotesById(userId);

    return notes.map(ResponseEntity::ok)
        .orElse(ResponseEntity.notFound().build());
  }
}
