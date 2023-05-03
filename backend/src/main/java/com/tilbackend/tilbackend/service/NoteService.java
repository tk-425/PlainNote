package com.tilbackend.tilbackend.service;

import com.tilbackend.tilbackend.document.Note;
import com.tilbackend.tilbackend.document.User;
import com.tilbackend.tilbackend.repository.NoteRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.data.mongodb.core.query.Update;
import org.springframework.stereotype.Service;

import java.util.*;

@Service
public class NoteService {

  private final NoteRepository noteRepository;
  private final MongoTemplate mongoTemplate;
  private final UserService userService;

  @Autowired
  public NoteService(NoteRepository noteRepository, MongoTemplate mongoTemplate, UserService userService) {
    this.noteRepository = noteRepository;
    this.mongoTemplate = mongoTemplate;
    this.userService = userService;
  }

  public Note createNote(String userId, String title, String noteBody) {

    Note note = noteRepository.insert(new Note(title, noteBody));

    mongoTemplate.update(User.class)
        .matching(Criteria.where("userId").is(userId))
        .apply(new Update().push("noteIds").value(note))
        .first();

    System.out.println("Note Created");

    return note;
  }

  public Note updateNote(String noteId, String title, String noteBody) {

    mongoTemplate.update(Note.class)
        .matching(Criteria.where("_id").is(noteId))
        .apply(new Update().set("title", title).set("body", noteBody))
        .first();

    System.out.println("Note Updated");

    return mongoTemplate.findById(noteId, Note.class);
  }

  public Note deleteNote(String userId, String noteId) {

    userService.deleteNoteByNoteId(userId, noteId);

    System.out.println("Note Deleted");

    Query query = new Query(Criteria.where("_id").is(noteId));
    return mongoTemplate.findAndRemove(query, Note.class);
  }

  public List<Note> searchNoteByKeyword(String userId, String keyword) {
    Optional<User> user = userService.getUserById(userId);
    Set<String> set = new HashSet<>(Arrays.asList(keyword.toLowerCase().split(" ")));

    System.out.println(set);

    if (user.isPresent()) {
      List<Note> notes = user.get().getNoteIds();

      return notes.stream().filter(note -> note.getBody().toLowerCase().contains(keyword))
          .toList();
    }

    return Collections.emptyList();
  }
}
