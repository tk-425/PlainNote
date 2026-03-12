package com.plainnote.backend.document;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.index.Indexed;
import org.springframework.data.mongodb.core.index.TextIndexed;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.Instant;

@Document(collection = "notes")
@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class Note {

    @Id
    private String id;

    @Indexed
    private String userId;

    @TextIndexed(weight = 2)
    private String title;

    @TextIndexed
    private String body;

    private Instant createdAt;

    private Instant updatedAt;
}
