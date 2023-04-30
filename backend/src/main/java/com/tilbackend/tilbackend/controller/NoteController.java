package com.tilbackend.tilbackend.controller;

import com.tilbackend.tilbackend.document.Note;
import com.tilbackend.tilbackend.service.NoteService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@CrossOrigin("http://localhost:3000")
@RestController
@RequestMapping("/api/v1/notes")
public class NoteController {

  private final NoteService noteService;

  @Autowired
  public NoteController(NoteService noteService) {
    this.noteService = noteService;
  }

  @PostMapping
  public ResponseEntity<Note> createNote(@RequestBody Map<String, String> payload) {

    return new ResponseEntity<>(noteService.createNote(
        payload.get("userId"), payload.get("title"), payload.get("noteBody")),
        HttpStatus.CREATED);
  }

  @PutMapping("/update")
  public ResponseEntity<Note> updateNote(@RequestBody Map<String, String> payload) {
    
    return new ResponseEntity<>(noteService.updateNote(
        payload.get("noteId"), payload.get("title"), payload.get("noteBody")),
        HttpStatus.OK);
  }

}
