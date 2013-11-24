'use strict'

function makeArray(__args, __startFrom) {
    //make [].slice.call(args) more understandable
    if (__startFrom === undefined)
        __startFrom = 0;
    return Array.prototype.slice.call(__args, __startFrom);
}

var App = function () {
    return {
        init: function () {
            this.nodes = document.querySelectorAll('.node');
            this.setListeners();
        },

        setListeners: function () {
            makeArray(this.nodes).forEach(function (n) {
                n.onclick = this.onClick.myBind(this);
            }, this);
        },

        onClick: function (e) {
            e = e || window.event;
            var node = e.target || e.srcElement;
            console.log(this);
            console.log(node);
            // this - should be the main context - instance of App
            // node - should be the node, that fires event
        }
    };
};

if (typeof Function.prototype.myBind === 'undefined') {
    Function.prototype.myBind = function (context) {
        var __this = this;
        return function() {
            __this.apply(context, arguments);
        }
    };
}

(new App()).init();

