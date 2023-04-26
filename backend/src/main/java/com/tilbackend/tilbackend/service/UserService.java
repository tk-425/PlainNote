package com.tilbackend.tilbackend.service;

import com.tilbackend.tilbackend.document.Note;
import com.tilbackend.tilbackend.document.User;
import com.tilbackend.tilbackend.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DuplicateKeyException;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.stereotype.Service;

import java.util.Collections;
import java.util.List;
import java.util.Optional;

@Service
public class UserService {

  private final UserRepository userRepository;

  private final MongoTemplate mongoTemplate;

  @Autowired
  public UserService(UserRepository userRepository, MongoTemplate mongoTemplate) {
    this.userRepository = userRepository;
    this.mongoTemplate = mongoTemplate;
  }

  public Optional<User> getUserById(String userId) {
    return userRepository.findUserByUserId(userId);
  }

  public Optional<List<Note>> getNotesById(String userId) {
    Optional<User> user = userRepository.findUserByUserId(userId);
    return user.map(User::getNoteIds);
  }

  public User createUser(String userId, String email) {
    User user = new User();
    user.setUserId(userId);
    user.setEmail(email);
    user.setNoteIds(Collections.emptyList());

    userRepository.save(user);

    try {
      mongoTemplate.insert(user);
    } catch (DuplicateKeyException ignore) { }

    return user;
  }
}
