var tableTraversing = {
    init: function () {
        var initContext = this;
        this.highlightClass = 'highlight';

        this.table = document.querySelectorAll('table')[0];
        this.table.onclick = function (e) {
            initContext.onClick(e);
        };

        document.onkeyup = (function (e) {
            initContext.onKeyUp(e);
        }).bind(this)
    }

    ,onClick: function (e) {
        var currentEl = e.target;

        this.clearHighlightedItems();
        if (currentEl.tagName.toLowerCase() === 'table') this.selectedEl = currentEl.firstElementChild;
        else this.selectedEl = currentEl;
        this.focused = true;
        this.highlightToggle(currentEl);
    }

    ,onKeyUp: function (e) {
        if (!this.focused) return;
        if (e.keyCode === 13) {//enter
            if (e.shiftKey) this.insertColumn();
            else this.addRowOrColumn();
        }
        if (e.keyCode === 46 && !e.shiftKey) {//delete
            this.deleteRowOrColumn();
        }
        switch (e.keyCode) {
            //left
            case 37:
                this.leftArrowAction();
                break;
            //up
            case 38:
                this.upAction();
                break;
            //right
            case 39:
                this.rightArrowAction();
                break;
            //down
            case 40:
                this.downAction();
                break;
            default:
                break;
        }
    }

    ,leftArrowAction: function () {
        var prevSibling = this.selectedEl.previousElementSibling;

        if (this.selectedEl.tagName.toLowerCase() === 'td') {
            this.highlightToggle(this.selectedEl);
            if (prevSibling) this.selectedEl = prevSibling;
            else this.selectedEl = this.selectedEl.parentNode;
            this.highlightToggle(this.selectedEl);
        }
        else if (this.selectedEl.tagName.toLowerCase() === 'tr') {
            this.highlightToggle(this.selectedEl);
            this.selectedEl = this.selectedEl.parentNode;
            this.highlightToggle(this.selectedEl.parentNode);
        }
    }
    ,rightArrowAction: function () {
        var nextSibling = this.selectedEl.nextElementSibling,
              currentTag = this.selectedEl.tagName.toLowerCase();

        this.highlightToggle(this.selectedEl);

        if (currentTag === 'td') {
            if (nextSibling) this.selectedEl = nextSibling;
            else this.selectedEl = this.selectedEl.parentNode.firstElementChild;
        }
        else if (currentTag === 'tbody') {
            if (this.selectedEl.rows.length > 0) {
                this.highlightToggle(this.selectedEl.parentNode);
                this.selectedEl = this.selectedEl.firstElementChild;
            }
        }
        else if (currentTag === 'tr') {
            if (this.selectedEl.cells.length > 0) {
                this.selectedEl = this.selectedEl.firstElementChild;
            }
        }
        this.highlightToggle(this.selectedEl);
    }
    ,upAction: function () {
        var selectedIndex = this.selectedEl.cellIndex,
              parent = this.selectedEl.parentNode,
              parentUpSibling = parent.previousElementSibling,
              upSibling = this.selectedEl.previousElementSibling,
              currentTag = this.selectedEl.tagName.toLowerCase();

        if (parent.tagName.toLowerCase() === 'table') return;

        if (parentUpSibling || upSibling) {
            if (currentTag === 'td' && parentUpSibling.children.length > 0) {
                var childs = parentUpSibling.children;
                this.highlightToggle(this.selectedEl);
                if (childs[selectedIndex] !== undefined) this.selectedEl = childs[selectedIndex];
                else this.selectedEl = childs[childs.length - 1];
                this.highlightToggle(this.selectedEl);
            }
            else if (currentTag === 'tr' && upSibling != undefined) {
                this.highlightToggle(this.selectedEl);
                this.selectedEl = upSibling;
                this.highlightToggle(this.selectedEl);
            }
        }
        else {
            this.highlightToggle(this.selectedEl);
            this.selectedEl = parent;
            if (parent.tagName.toLowerCase() === 'tbody') this.highlightToggle(parent.parentNode);
            else this.highlightToggle(this.selectedEl);
        }
    }
    ,downAction: function () {
        var selectedIndex = this.selectedEl.cellIndex,
              parentDownSibling = this.selectedEl.parentNode.nextElementSibling,
              downSibling = this.selectedEl.nextElementSibling,
              currentTag = this.selectedEl.tagName.toLowerCase();

        if (currentTag === 'td' && parentDownSibling && parentDownSibling.children.length > 0) {
            var childs = parentDownSibling.children;
            this.highlightToggle(this.selectedEl);
            if (childs[selectedIndex] !== undefined) this.selectedEl = childs[selectedIndex];
            else this.selectedEl = childs[childs.length - 1];
            this.highlightToggle(this.selectedEl);
        }
        else if (currentTag === 'tr' && downSibling) {
            this.highlightToggle(this.selectedEl);
            this.selectedEl = downSibling;
            this.highlightToggle(this.selectedEl);
        }
        else if (currentTag === 'tbody' && this.selectedEl.rows.length > 0) {
            this.highlightToggle(this.selectedEl.parentNode);
            this.selectedEl = this.selectedEl.firstElementChild;
            this.highlightToggle(this.selectedEl);
        }
    }

    ,deleteRowOrColumn: function () {
        var currentTag = this.selectedEl.tagName.toLowerCase();
        if (currentTag !== 'tr' && currentTag !== 'td') return;

        var nextSiblingColumn = this.selectedEl.nextElementSibling;
        var prevSiblingColumn = this.selectedEl.previousElementSibling;
        var parent = this.selectedEl.parentNode;
        this.selectedEl.parentNode.removeChild(this.selectedEl);
        if (nextSiblingColumn) this.selectedEl = nextSiblingColumn;
        else if (prevSiblingColumn) this.selectedEl = prevSiblingColumn;
        else this.selectedEl = parent;

        if (this.selectedEl.tagName.toLowerCase() === 'tbody') this.highlightToggle(this.selectedEl.parentNode);
        else this.highlightToggle(this.selectedEl);
    }

    ,addRowOrColumn: function () {
        var currentTag = this.selectedEl.tagName.toLowerCase();

        if (currentTag === 'td') {
            this.selectedEl.parentNode.insertCell(this.selectedEl.cellIndex + 1);
        }
        else if (currentTag === 'tr') {
            this.selectedEl.parentNode.insertRow(this.selectedEl.rowIndex + 1);
        }
        else if (currentTag === 'tbody') {
            this.selectedEl.parentNode.insertRow();
        }
    }

    ,insertColumn: function () {
        if (this.selectedEl.tagName.toLowerCase() === 'tr') {
            this.selectedEl.insertCell();
        }
    }

    ,clearHighlightedItems: function (callback) {
        var highlightedElems = document.querySelectorAll('.' + this.highlightClass),
              len = highlightedElems.length;
        if (len == 0) return;
        for (var i = 0; i < len; i++) {
            this.highlightToggle(highlightedElems[i]);
        }
    }

    ,highlightToggle: function (_element) {
        if (!_element) return;
        if ( _element.classList.contains(this.highlightClass) ) _element.classList.remove(this.highlightClass);
        else _element.classList.add(this.highlightClass);
    }
};

tableTraversing.init();

