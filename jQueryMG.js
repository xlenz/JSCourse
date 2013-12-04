
var $$ = function (selector, element) {
    if (element != null) {
        this.el = element.querySelectorAll(selector);
    }
    else {
        this.el = document.querySelectorAll(selector);
    }
    return this.el;
};

$$.prototype.width = function () {
    if (this.el == null) {
        return null;
    }
    else {
        return this.el;
    }
};
