package com.plainnote.backend.controller;

import com.plainnote.backend.controller.request.CreateUserRequest;
import com.plainnote.backend.document.Note;
import com.plainnote.backend.document.User;
import com.plainnote.backend.service.UserService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;
import java.util.List;

@Slf4j
@RestController
@RequestMapping("/api/v1/user")
@RequiredArgsConstructor
public class UserController {

    private final UserService userService;

    @GetMapping
    public ResponseEntity<User> getAuthenticatedUser(Principal principal) {
        log.info("GET /api/v1/user - clerkUserId={}", principal.getName());
        User user = userService.getUser(principal.getName());
        return ResponseEntity.ok(user);
    }

    @PostMapping
    public ResponseEntity<User> createUser(@RequestBody CreateUserRequest request) {
        log.info("POST /api/v1/user - clerkUserId={}", request.clerkUserId());
        User user = userService.findOrCreateUser(request.clerkUserId(), request.email());
        return ResponseEntity.status(HttpStatus.CREATED).body(user);
    }

    @GetMapping("/notes/{userId}")
    public ResponseEntity<List<Note>> getNotesByUserId(@PathVariable String userId) {
        log.info("GET /api/v1/user/notes/{}", userId);
        List<Note> notes = userService.getNotesByUserId(userId);
        return ResponseEntity.ok(notes);
    }
}
