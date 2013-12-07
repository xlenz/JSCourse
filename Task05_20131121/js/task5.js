'use strict'

// http://jsperf.com/for-vs-for-in-within-object/2

function forEachObj (obj, callback) {
    var forEachObjName = 'forEachObj';
    if (typeof callback != 'function') {
        throw new Error(forEachObjName + ': callback is not a function.');
    }
    if (obj === undefined || obj === null) {
        throw new Error(forEachObjName + ': object is undefined or null');
    }
    Object.keys(obj).forEach(function(key) {
        callback(key);
    });
}

//make [].slice.call(args) more understandable
function argsToArray(__args, __startFrom) {
    return Array.prototype.slice.call(__args, __startFrom);
}

//task #1

var App = function () {
    return {
        init: function () {
            this.nodes = document.querySelectorAll('.node');
            this.setListeners();
        },

        setListeners: function () {
            argsToArray(this.nodes).forEach(function (n) {
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
        var __args = argsToArray(arguments, 1);
        return function() {
            return __this.apply(context, __args.concat(argsToArray(arguments)));
        };
    };
}

(new App()).init();

//task #2

var Person = function(args) {
    var _person = {};
    forEachObj(args, function(key) {
        if (args.hasOwnProperty(key)) {
            _person[key] = args[key];
        }
    });
    return _person;
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
    var _personExtended = {};
    var getSet = function(val) {
        return {
              get: function() { return val; }
            , set: function(newVal) {
                val = newVal;
            }
        }
    };
    forEachObj(args, function(key) {
        if (typeof args[key] !== 'function') {
            var capitalizedProperty = key.substring(0, 1).toUpperCase() + key.substring(1);
            var getterName = 'get' + capitalizedProperty;
            var setterName = 'set' + capitalizedProperty;
            var keyVal = getSet(args[key]);

            _personExtended[getterName] = keyVal.get;
            _personExtended[setterName] = keyVal.set;
        }
        else if (typeof args[key] === 'function') {
            _personExtended[key] = args[key].bind(args);
        }
    });
    return _personExtended;
};



