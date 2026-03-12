package com.plainnote.backend.service;

import com.plainnote.backend.document.Note;
import com.plainnote.backend.repository.NoteRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.lang.NonNull;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.time.Instant;
import java.util.List;

@Slf4j
@Service
@RequiredArgsConstructor
public class NoteService {

    private final NoteRepository noteRepository;

    public Note createNote(String userId, String title, String body) {
        log.info("Creating note for userId={}", userId);
        Note note = Note.builder()
                .userId(userId)
                .title(title)
                .body(body)
                .createdAt(Instant.now())
                .updatedAt(Instant.now())
                .build();
        return noteRepository.save(note);
    }

    public Note updateNote(String noteId, String title, String body) {
        log.info("Updating noteId={}", noteId);
        Note note = noteRepository.findNoteById(noteId)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Note not found"));
        note.setTitle(title);
        note.setBody(body);
        note.setUpdatedAt(Instant.now());
        return noteRepository.save(note);
    }

    public void deleteNote(@NonNull String noteId) {
        log.info("Deleting noteId={}", noteId);
        if (!noteRepository.existsById(noteId)) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Note not found");
        }
        noteRepository.deleteById(noteId);
    }

    public List<Note> searchNotesByKeyword(String userId, String keyword) {
        log.info("Searching notes for userId={} keyword={}", userId, keyword);
        return noteRepository.searchByUserIdAndKeyword(userId, keyword);
    }
}
