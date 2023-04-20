package com.tilbackend.tilbackend.document;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.bson.types.ObjectId;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "notes")
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Note {

  private ObjectId id;

  private String body;

  public Note(String body) {
    this.body = body;
  }
}
