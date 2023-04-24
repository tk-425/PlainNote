package com.tilbackend.tilbackend.service;

import com.tilbackend.tilbackend.document.Note;
import com.tilbackend.tilbackend.document.User;
import com.tilbackend.tilbackend.repository.NoteRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Update;
import org.springframework.stereotype.Service;

import java.util.List;

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

  public List<Note> getNotes() {
    return noteRepository.findAll();
  }

  public Note addNote(String noteBody, String userId) {
    Note note = noteRepository.insert(new Note(noteBody));

    mongoTemplate.update(User.class)
        .matching(Criteria.where("userId").is(userId))
        .apply(new Update().push("noteIds").value(note))
        .first();

    return note;
  }

  // TODO: update, delete, get all notes
}
