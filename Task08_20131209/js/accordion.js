'use strict';

(function() {
  var tabBodies = $('#accordion .tab-body').css('max-height', 0).removeClass('active');

  $('#accordion .tab-head').click(function(e) {
    e.preventDefault();
    var tabBody = $(this).next('.tab-body');

    if (tabBody.height() > 0) {
      if (tabBody.hasClass('active')) {
        collapse(tabBody);
      } else {
        expand(tabBody);
      }
    } else {
      if (!tabBodies.hasClass('active')) {
        expand(tabBody);
      } else {
        collapse(tabBodies, tabBody);
      }
    }
  });

  function collapse(tabs, tab) {
    tabs.removeClass('active').stop().animate({
      height: '0'
    }, function() {
      $(this).css('max-height', 0);
      if (tab) {
        expand(tab);
      }
    });
  }

  function expand(tab) {
    var curHeight = tab.addClass('active').css('height');
    tab.css('max-height', curHeight)
      .css('height', '')
      .stop().animate({
        maxHeight: '400px'
      }, collapse(tabBodies.not(tab)));
  }

})();