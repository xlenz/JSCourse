'use strict';

(function ($) {
    var tabBodies = $('#accordion .tab-body').css('max-height', 0).removeClass('active');

    $('#accordion .tab-head').click(function (e) {
        e.preventDefault();
        var tabBody = $(this).next('.tab-body');

        if (tabBody.height() > 1) {
            if (tabBody.hasClass('active')) {
                collapse(tabBody);
            }
            else {
                expand(tabBody);
            }
        } else {
            collapse(tabBodies.not(tabBody));
            expand(tabBody);
        }
    });

    function collapse (el) {
        el.removeClass('active').stop().animate({height: '0'}, function () {
                $(this).css('max-height', 0);
            }
        });
    }

    function expand (el) {
        var curHeight = el.addClass('active').css('height');
        el.css('max-height', curHeight)
           .css('height', '')
           .stop().animate({maxHeight: '400px'});
    }

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





















