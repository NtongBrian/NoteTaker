// library.js - Reusable Utility Functions

"use strict";

/**
 * Utility Library for NoteTaker App
 * Author: Brian Ntong (Group Project)
 */

const NoteLib = (function() {
  function generateID() {
    return 'note_' + Date.now();
  }

  function getNotes() {
    try {
      const notes = JSON.parse(localStorage.getItem("notes")) || [];
      return Array.isArray(notes) ? notes : [];
    } catch (err) {
      console.error("Error reading notes:", err);
      return [];
    }
  }

  function saveNotes(notesArray) {
    try {
      localStorage.setItem("notes", JSON.stringify(notesArray));
    } catch (err) {
      console.error("Error saving notes:", err);
    }
  }

  function findNoteById(id) {
    return getNotes().find(note => note.id === id);
  }

  function removeNoteById(id) {
    let notes = getNotes().filter(note => note.id !== id);
    saveNotes(notes);
  }

  function togglePinNote(id) {
    let notes = getNotes().map(note => {
      if (note.id === id) {
        note.pinned = !note.pinned;
      }
      return note;
    });
    saveNotes(notes);
  }

  return {
    generateID,
    getNotes,
    saveNotes,
    findNoteById,
    removeNoteById,
    togglePinNote
  };
})();
