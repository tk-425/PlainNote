package com.plainnote.backend.repository;

import com.plainnote.backend.document.Note;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;

import java.util.List;
import java.util.Optional;

public interface NoteRepository extends MongoRepository<Note, String> {

    Optional<Note> findNoteById(String id);

    List<Note> findAllByUserId(String userId);

    @Query("{ 'userId': ?0, $text: { $search: ?1 } }")
    List<Note> searchByUserIdAndKeyword(String userId, String keyword);
}
