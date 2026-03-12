package com.plainnote.backend.repository;

import com.plainnote.backend.document.User;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.Optional;

public interface UserRepository extends MongoRepository<User, String> {

    Optional<User> findByClerkUserId(String clerkUserId);
}
