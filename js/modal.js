// modal.js - Modal Window Handling

"use strict";

/**
 * Modal Logic for NoteTaker
 * Author: Brian Ntong (Group Project)
 */

$(document).ready(function () {
  const $modal = $('#noteModal');
  const $closeBtn = $('.closeBtn');

  $('#addNoteBtn').on('click', function () {
    $('#modalTitle').text('New Note');
    $('#noteTitle').val('');
    $('#noteContent').val('');
    $modal.removeClass('hidden');
  });

  $closeBtn.on('click', function () {
    $modal.addClass('hidden');
  });

  $(window).on('click', function (e) {
    if (e.target.id === 'noteModal') {
      $modal.addClass('hidden');
    }
  });
});
