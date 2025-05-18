// main.js - Application Core Logic

"use strict";

/**
 * NoteTaker Main Script
 * Author: Brian Ntong (Group Project)
 */

$(document).ready(function () {
  const $notesContainer = $('#notesContainer');
  const $loader = $('#loader');

  function showLoader() {
    $loader.show();
  }

  function hideLoader() {
    setTimeout(() => $loader.hide(), 500);
  }

  function renderNotes(notes) {
    $notesContainer.html('');
    if (notes.length === 0) {
      $notesContainer.html('<p>No notes found.</p>');
      return;
    }

    // Sort: pinned notes first
    notes.sort((a, b) => (b.pinned === true) - (a.pinned === true));

    notes.forEach(note => {
      const card = `<div class="note-card ${note.pinned ? 'pinned' : ''}" data-tooltip="Click to edit">
        <h3>${note.title}</h3>
        <p>${note.content}</p>
        <div class="actions">
          <button class="pinBtn" data-id="${note.id}" data-tooltip="${note.pinned ? 'Unpin this note' : 'Pin this note'}">${note.pinned ? 'Unpin' : 'Pin'}</button>
          <button class="editBtn" data-id="${note.id}" data-tooltip="Edit this note">Edit</button>
          <button class="deleteBtn" data-id="${note.id}" data-tooltip="Delete this note">Delete</button>
        </div>
      </div>`;
      $notesContainer.append(card);
    });
    
  }

  function loadNotes() {
    showLoader();
    const notes = NoteLib.getNotes();
    renderNotes(notes);
    hideLoader();
  }

  $('#saveNoteBtn').on('click', function () {
    try {
      const title = $('#noteTitle').val().trim();
      const content = $('#noteContent').val().trim();
      if (!title || !content) throw new Error("Title and Content are required.");

      let notes = NoteLib.getNotes();
      const id = $('#modalTitle').text() === 'New Note' ? NoteLib.generateID() : $('#saveNoteBtn').data('edit-id');

      if ($('#modalTitle').text() === 'New Note') {
        notes.push({ id, title, content, pinned: false });
      } else {
        notes = notes.map(note => note.id === id ? { ...note, title, content } : note);
      }

      NoteLib.saveNotes(notes);
      $('#noteModal').addClass('hidden');
      loadNotes();
    } catch (err) {
      alert(err.message);
    }
  });

  $notesContainer.on('click', '.deleteBtn', function () {
    const id = $(this).data('id');
    if (confirm("Are you sure you want to delete this note?")) {
      NoteLib.removeNoteById(id);
      loadNotes();
    }
  });

  $notesContainer.on('click', '.editBtn', function () {
    const id = $(this).data('id');
    const note = NoteLib.findNoteById(id);
    if (note) {
      $('#modalTitle').text('Edit Note');
      $('#noteTitle').val(note.title);
      $('#noteContent').val(note.content);
      $('#saveNoteBtn').data('edit-id', id);
      $('#noteModal').removeClass('hidden');
    }
  });

  $notesContainer.on('click', '.pinBtn', function () {
    const id = $(this).data('id');
    NoteLib.togglePinNote(id);
    loadNotes();
  });

  $('#searchBox').on('input', function () {
    const query = $(this).val().toLowerCase();
    const notes = NoteLib.getNotes().filter(note =>
      note.title.toLowerCase().includes(query) ||
      note.content.toLowerCase().includes(query)
    );
    renderNotes(notes);
  });

  $('#getStartedBtn').on('click', function () {
    window.location.href = 'notes.html';
  });

  loadNotes();
});
