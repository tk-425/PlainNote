package com.plainnote.backend.controller.request;

public record UpdateNoteRequest(String noteId, String title, String body) {}
