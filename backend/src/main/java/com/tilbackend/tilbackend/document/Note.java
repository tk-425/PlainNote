package com.tilbackend.tilbackend.document;

import com.fasterxml.jackson.databind.annotation.JsonSerialize;
import com.fasterxml.jackson.databind.ser.std.ToStringSerializer;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.bson.types.ObjectId;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "notes")
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Note {

  @Id
  @JsonSerialize(using = ToStringSerializer.class)
  private ObjectId id;

  private String title;

  private String body;

  public Note(String title, String body) {
    this.title = title;
    this.body = body;
  }
}
