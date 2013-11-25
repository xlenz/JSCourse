'use strict'

//task #1

function makeArray(__args, __startFrom) {
    //make [].slice.call(args) more understandable
    if (__startFrom === undefined) {
        __startFrom = 0;
    }
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
        var __args = makeArray(arguments, 1);
        return function() {
            __this.apply(context, __args.concat(makeArray(arguments)));
        };
    };
}

(new App()).init();

//task #2

var Person = function(args) {
    for (var key in args) {
        if (args.hasOwnProperty(key)) {
            this[key] = args[key];
        }
    }
};

var p = new Person({
    name: 'Jack'
    , age: 10
    , jump: function() { return 'My name is ' + this.name + ' and I can jump.'; }
});

console.log(p.name);
console.log(p.age);
console.log(p.jump()); // “My name is Jack and I can jump.”

//task #3

var PersonExtended = function (args) {
    var getSet = function(val) {
        return {
            get: function() { return val; }
            , set: function(newVal) {
                val = newVal;
            }
        }
    };
    for (var key in args) {
        if (args.hasOwnProperty(key) && typeof args[key] !== 'function') {
            var capitalizedProperty = key.substring(0, 1).toUpperCase() + key.substring(1);
            var getterName = 'get' + capitalizedProperty;
            var setterName = 'set' + capitalizedProperty;
            var keyVal = getSet(args[key]);

            this[getterName] = keyVal.get;
            this[setterName] = keyVal.set;
        }
        else if (typeof args[key] === 'function') {
            this[key] = args[key].bind(args);
        }
    }
};



