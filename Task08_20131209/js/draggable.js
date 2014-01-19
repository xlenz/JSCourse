'use strict';

(function () {
  var config = {
    dragColorClick: 'red'
  };
  var dragging = false;
  var container = $('div.range');
  var containerWidth = container.width();
  var containerWidthDrag = containerWidth + 2;
  var drag = container.find('span.drag');
  var dragColor = drag.css('background-color');
  var dragWidth = drag.width() * 0.5 - 2;
  var containerPos = container.position().left;
  var containerPosDrag = containerPos + dragWidth;
  var overlayDark = $('#overlayDark');

  $(document).on('mousemove', function (e) {
    if (!dragging) {
      return;
    }
    var leftOffset;
    if (e.clientX < containerWidthDrag && e.clientX >= containerPosDrag) {
      leftOffset = e.pageX - dragWidth;
    } else if (e.clientX > containerWidthDrag) {
      leftOffset = containerWidth - 2;
    } else if (e.clientX < containerPosDrag) {
      leftOffset = containerPos;
    }
    drag.offset({
      left: leftOffset
    });
  });
  drag.on('mousedown', function (e) {
    e.preventDefault();
    dragging = true;
    drag.stop().animate({
      backgroundColor: config.dragColorClick
    });
    overlayDark.css('z-index', 1).stop().animate({
      opacity: 0.5
    });
  });

  $(window).on("mouseup", function (e) {
    dragging = false;
    overlayDark.stop().animate({
      opacity: 0
    }, {
      complete: function () {
        overlayDark.css('z-index', -1);
        drag.stop().animate({
          backgroundColor: dragColor
        });
      }
    });

  });
})();
