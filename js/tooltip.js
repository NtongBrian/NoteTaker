// tooltip.js - Tooltip Logic

"use strict";

/**
 * Tooltip Module for NoteTaker
 * Author: Brian Ntong (Group Project)
 */

$(document).ready(function () {
  const $tooltip = $('#tooltip');

  $('[data-tooltip]').on('mouseenter', function (e) {
    const text = $(this).attr('data-tooltip');
    $tooltip.text(text).fadeIn(200);
  });

  $('[data-tooltip]').on('mousemove', function (e) {
    $tooltip.css({
      top: e.pageY + 15 + 'px',
      left: e.pageX + 15 + 'px'
    });
  });

  $('[data-tooltip]').on('mouseleave', function () {
    $tooltip.fadeOut(100);
  });
});
