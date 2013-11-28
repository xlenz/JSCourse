var tableTraversing = {
    init: function () {
        var initContext = this;

        this.table = document.querySelectorAll('table')[0];
        this.table.onclick = function (e) {
            initContext.onClick(e);
        };
    }

    ,onClick: function (e) {
        var currentEl = e.target;

        currentEl.classList.add("highlight");
        this.selectedEl = currentEl;
        this.focused = true;
        console.log(this);
        console.log(currentEl);
    }

};

tableTraversing.init();

