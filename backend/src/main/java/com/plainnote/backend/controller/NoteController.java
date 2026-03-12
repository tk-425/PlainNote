package com.plainnote.backend.controller;

import com.plainnote.backend.controller.request.CreateNoteRequest;
import com.plainnote.backend.controller.request.UpdateNoteRequest;
import com.plainnote.backend.document.Note;
import com.plainnote.backend.service.NoteService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.lang.NonNull;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;
import java.util.List;

@Slf4j
@RestController
@RequestMapping("/api/v1/notes")
@RequiredArgsConstructor
public class NoteController {

    private final NoteService noteService;

    @PostMapping
    public ResponseEntity<Note> createNote(@RequestBody CreateNoteRequest request, Principal principal) {
        log.info("POST /api/v1/notes - userId={}", principal.getName());
        Note note = noteService.createNote(principal.getName(), request.title(), request.body());
        return ResponseEntity.status(HttpStatus.CREATED).body(note);
    }

    @PutMapping("/update")
    public ResponseEntity<Note> updateNote(@RequestBody UpdateNoteRequest request) {
        log.info("PUT /api/v1/notes/update - noteId={}", request.noteId());
        Note note = noteService.updateNote(request.noteId(), request.title(), request.body());
        return ResponseEntity.ok(note);
    }

    @DeleteMapping("/{noteId}")
    public ResponseEntity<Void> deleteNote(@PathVariable @NonNull String noteId) {
        log.info("DELETE /api/v1/notes/{}", noteId);
        noteService.deleteNote(noteId);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/search/{keyword}")
    public ResponseEntity<List<Note>> searchNotes(@PathVariable String keyword, Principal principal) {
        log.info("GET /api/v1/notes/search/{} - userId={}", keyword, principal.getName());
        List<Note> notes = noteService.searchNotesByKeyword(principal.getName(), keyword);
        return ResponseEntity.ok(notes);
    }
}
