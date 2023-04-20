package com.tilbackend.tilbackend.repository;

import com.tilbackend.tilbackend.document.User;
import org.bson.types.ObjectId;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UserRepository extends MongoRepository<User, ObjectId> {
  Optional<User> findUserByUserId(String userId);
}
