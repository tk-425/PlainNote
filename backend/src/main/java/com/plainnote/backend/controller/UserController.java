package com.plainnote.backend.controller;

import com.plainnote.backend.document.Note;
import com.plainnote.backend.document.User;
import com.plainnote.backend.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@CrossOrigin(origins = {"https://plainnote.onrender.com", "http://localhost:3000"})
@RestController
@RequestMapping("/api/v1/user")
public class UserController {

  private final UserService userService;

  @Autowired
  public UserController(UserService userService) {
    this.userService = userService;
  }

  @GetMapping
  public ResponseEntity<User> authenticateUserId(Principal principal) {
    System.out.println("AUTHENTICATE USER");
    if (userService.authCheck(principal.getName()) != null) {
      return new ResponseEntity<>(userService.authCheck(principal.getName()), HttpStatus.OK);
    }

    return new ResponseEntity<>(null, HttpStatus.NO_CONTENT);
  }

  @PostMapping
  public ResponseEntity<User> createUser(@RequestBody Map<String, String> payload) {
    System.out.println("CREATE USER");
    return new ResponseEntity<>(userService.createUser(
        payload.get("userId"), payload.get("email")),
        HttpStatus.CREATED);
  }

  @GetMapping("/notes/{userId}")
  public ResponseEntity<List<Note>> getNotesById(@PathVariable String userId) {

    Optional<List<Note>> notes = userService.getNotesById(userId);
    System.out.println("GET NOTES BY ID");
    return notes.map(ResponseEntity::ok)
        .orElse(ResponseEntity.notFound().build());
  }
}
