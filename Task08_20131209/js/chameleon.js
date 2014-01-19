'use strict';

(function() {
  var colorDefault = '#00FF47';
  var colorHover = '#738678';
  var colorClick = '#A0FFBA';

  $('.chameleon')
    .hover(
      function(e) {
        $(this).stop().animate({
          backgroundColor: colorHover
        });
      },
      function(e) {
        $(this).stop().animate({
          backgroundColor: colorDefault
        });
      })
    .mousedown(function(e) {
      $(this).stop().animate({
        backgroundColor: colorClick
      });
    })
    .mouseup(function(e) {
      $(this).stop().animate({
        backgroundColor: colorHover
      });
    });
})();