package com.tilbackend.tilbackend.document;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.bson.types.ObjectId;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.DocumentReference;

import java.util.List;

@Document(collection = "users")
@Data
@AllArgsConstructor
@NoArgsConstructor
public class User {

  @Id
  private ObjectId id;

  private String userId;

  private String email;

  @DocumentReference
  private List<Note> noteIds;

  public User(String userId, String email) {
    this.userId = userId;
    this.email = email;
  }
}
