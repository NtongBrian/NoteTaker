// statistics.js - Note Insights and Analytics
"use strict";

$(document).ready(function () {
  const $statsList = $('#statsList');
  const $loader = $('#loader');

  function showLoader() {
    $loader.show();
  }

  function hideLoader() {
    setTimeout(() => $loader.hide(), 500);
  }

  function calculateStats(notes) {
    const totalNotes = notes.length;
    const pinnedNotes = notes.filter(n => n.pinned).length;

    const sortedByLength = [...notes].sort((a, b) => b.content.length - a.content.length);
    const longestNote = sortedByLength[0];

    const totalWords = notes.reduce((sum, n) => sum + n.content.trim().split(/\s+/).length, 0);
    const averageLength = totalNotes ? (notes.reduce((sum, n) => sum + n.content.length, 0) / totalNotes).toFixed(2) : 0;

    let mostRecent = 'N/A';
    try {
      const latestId = notes.map(n => parseInt(n.id.replace('note_', ''))).sort().reverse()[0];
      if (!isNaN(latestId)) {
        mostRecent = new Date(latestId).toLocaleString();
      }
    } catch (err) {
      mostRecent = 'N/A';
    }

    return {
      totalNotes,
      pinnedNotes,
      longestNoteTitle: longestNote ? longestNote.title : 'N/A',
      averageLength,
      totalWords,
      mostRecent
    };
  }

  function renderStats(stats) {
    if (stats.totalNotes === 0) {
      $statsList.html(`<li>No notes found. Start creating some notes!</li>`);
      return;
    }

    $statsList.html(`
      <li data-tooltip="Number of all notes created"><strong>Total Notes:</strong> ${stats.totalNotes}</li>
      <li data-tooltip="Notes that are marked as pinned"><strong>Pinned Notes:</strong> ${stats.pinnedNotes}</li>
      <li data-tooltip="Title of the longest note"><strong>Longest Note Title:</strong> ${stats.longestNoteTitle}</li>
      <li data-tooltip="Total number of words across all notes"><strong>Total Words:</strong> ${stats.totalWords}</li>
      <li data-tooltip="Average number of characters per note"><strong>Average Note Length (chars):</strong> ${stats.averageLength}</li>
      <li data-tooltip="Latest note creation date"><strong>Most Recent Note Created:</strong> ${stats.mostRecent}</li>
    `);
  }

  function loadStatistics() {
    try {
      showLoader();
      const notes = NoteLib.getNotes();
      const stats = calculateStats(notes);
      renderStats(stats);
      hideLoader();
    } catch (err) {
      $statsList.html(`<li>Error loading statistics: ${err.message}</li>`);
      hideLoader();
    }
  }

  loadStatistics();
});
