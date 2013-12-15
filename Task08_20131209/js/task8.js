(function($) {
  var allPanels = $('#accordion .tab-body').hide();

  $('#accordion .tab-head a').click(function() {
    allPanels.slideUp();
    $(this).parent().parent().find('.tab-body').slideDown();
    return false;
  });

})(jQuery);

(function($) {
  var allPanels = $('.accordion > dd').hide();

  $('.accordion > dt > a').click(function() {
      $this = $(this);
      $target =  $this.parent().next();

      if(!$target.hasClass('active')){
         allPanels.removeClass('active').slideUp();
         $target.addClass('active').slideDown();
      }

    return false;
  })
