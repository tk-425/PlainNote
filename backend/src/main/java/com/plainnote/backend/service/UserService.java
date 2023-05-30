package com.plainnote.backend.service;

import com.plainnote.backend.document.Note;
import com.plainnote.backend.document.User;
import com.plainnote.backend.repository.UserRepository;
import org.bson.types.ObjectId;
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

  public User authCheck(String userId) {

    Optional<User> userOptional = getUserById((userId));

    return userOptional.orElse(null);
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
    } catch (DuplicateKeyException ignore) {}

    return user;
  }

  public void deleteNoteByNoteId(String userId, String noteId) {

    Optional<User> userOptional = getUserById(userId);

    if (userOptional.isPresent()) {
      User user = userOptional.get();
      user.getNoteIds().removeIf(note -> note.getId().equals(new ObjectId(noteId)));
      mongoTemplate.save(user);
    }
  }
}
