package com.tilbackend.tilbackend.service;

import com.tilbackend.tilbackend.document.Note;
import com.tilbackend.tilbackend.document.User;
import com.tilbackend.tilbackend.repository.NoteRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Update;
import org.springframework.stereotype.Service;

@Service
public class NoteService {

  private final NoteRepository noteRepository;

  private final MongoTemplate mongoTemplate;

  @Autowired
  public NoteService(NoteRepository noteRepository,
                     MongoTemplate mongoTemplate) {
    this.noteRepository = noteRepository;
    this.mongoTemplate = mongoTemplate;
  }

  public Note createNote(String userId, String title, String noteBody) {
    Note note = noteRepository.insert(new Note(title, noteBody));

    mongoTemplate.update(User.class)
        .matching(Criteria.where("userId").is(userId))
        .apply(new Update().push("noteIds").value(note))
        .first();

    return note;
  }

  public Note updateNote(String noteId, String title, String noteBody) {
    mongoTemplate.update(Note.class)
        .matching(Criteria.where("_id").is(noteId))
        .apply(new Update().set("title", title).set("body", noteBody))
        .first();

    return mongoTemplate.findById(noteId, Note.class);
  }
}
