var jQueryMG = function (selector, element) {
    init: {
        if (element != null) {
            this.el = element.querySelectorAll(selector);
        }
        else {
            this.el = document.querySelectorAll(selector);
        }
    }
};

$$ = jQueryMG.init();
