'use strict';

(function ($) {
    var tabBodies = $('#accordion .tab-body').css('max-height', 0);

    $('#accordion .tab-head').click(function (e) {
        e.preventDefault();
        var tabBody = $(this).next('.tab-body');

        if (tabBody.height() > 0) {
            tabBody.stop().animate({height: '0'}, function () {
                $(this).css('max-height', 0);
            });
        } else {
            tabBody
                .css('height', '')
                .stop().animate({maxHeight: '400px'})
                .not(tabBody).stop().animate({height: 0}, function () {
                    $(this).css('max-height', 0);
                });
        }
    });
})(jQuery);

(function ($) {
    $('.chameleon')
        .hover(
            function (e) {
                $(this).stop().animate({backgroundColor: '#738678'});
            },
            function (e) {
                $(this).stop().animate({backgroundColor: '#00FF47'});
            }
        )
        .mousedown(function (e) {
            $(this).stop().animate({backgroundColor: '#A0FFBA'});
        })
        .mouseup(function (e) {
            $(this).stop().animate({backgroundColor: '#738678'});
        });
})(jQuery);

(function ($) {
    //
})(jQuery);





















