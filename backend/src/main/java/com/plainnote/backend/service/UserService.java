package com.plainnote.backend.service;

import com.plainnote.backend.document.Note;
import com.plainnote.backend.document.User;
import com.plainnote.backend.repository.NoteRepository;
import com.plainnote.backend.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.time.Instant;
import java.util.List;

@Slf4j
@Service
@RequiredArgsConstructor
public class UserService {

    private final UserRepository userRepository;
    private final NoteRepository noteRepository;

    public User getUser(String clerkUserId) {
        log.info("Fetching user for clerkUserId={}", clerkUserId);
        return userRepository.findByClerkUserId(clerkUserId)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "User not found"));
    }

    public User findOrCreateUser(String clerkUserId, String email) {
        return userRepository.findByClerkUserId(clerkUserId).orElseGet(() -> {
            log.info("Creating new user for clerkUserId={}", clerkUserId);
            User newUser = User.builder()
                    .clerkUserId(clerkUserId)
                    .email(email)
                    .createdAt(Instant.now())
                    .build();
            return userRepository.save(newUser);
        });
    }

    public List<Note> getNotesByUserId(String clerkUserId) {
        log.info("Fetching notes for clerkUserId={}", clerkUserId);
        return noteRepository.findAllByUserId(clerkUserId);
    }
}
