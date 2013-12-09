'use strict'

var $$ = function (selector, element) {
    var elems = [];
    if (selector !== null && typeof selector === 'object') {
        elems.push(selector);
    }
    else if (element !== null && element !== undefined) {
        elems = element.querySelectorAll(selector);
    }
    else {
        elems = document.querySelectorAll(selector);
    }
    return new MyArray(elems);
};

$$.each = function (obj, callback) {
    if (typeof callback != 'function') {
        throw new Error('$$.each: callback is not a function.');
    }
    if (obj === undefined || obj === null) {
        throw new Error('$$.each: object is undefined or null');
    }
    Object.keys(obj).forEach(function(key) {
        callback(key);
    });
};

$$.isWindow = function (obj) {
    return obj && typeof obj === "object" && "setInterval" in obj;
};

function MyArray (arr) {
    $$.each(MyArray.prototype, function(key) {
        arr[key] = MyArray.prototype[key];
    });
  return arr;
}

MyArray.prototype = {
      width: function (val) {
        return tools.dimensions(this, val, 'width');
      }

    , height: function (val) {
        return tools.dimensions(this, val, 'height');
    }

    , delegate: function (selector, eventType, handler) {
        var elems = this;
        if (this.length === 0) {
            return null;
        }
        if (typeof handler != 'function') {
            throw new Error('delegate: handler is not a function.');
        }
        if (typeof selector != 'string' || typeof eventType != 'string') {
            throw new Error('delegate: selector and eventType should be a string.');
        }
        elems.each(function(key, el) {
            if (el.querySelectorAll) {
                var selElems = el.querySelectorAll(selector);
                var seLength = selElems.length;
                for (var i = 0; i < seLength; i++) {
                    selElems[i].addEventListener(eventType, handler);
                }
            }
        });
        return elems;
    }

    , removeStyle: function (style) {
        var elems = this;
        elems.each(function(key, value) {
            if (value.style) {
                value.style.removeProperty(style);
            }
        });
        return elems;
    }

    , each: function (callback) {
        var elems = this;
        if (typeof callback != 'function') {
            throw new Error('each: callback is not a function.');
        }
        for (var i = 0; i < this.length; i++) {
            callback(i, elems[i]);
        }
        return elems;
    }

    , setStyle: function (prop, value) {
        var elems = this;
        elems.each(function(key, val) {
            if (val.style) {
                val.style[prop] = value;
            }
        });
        return elems;
    }
}

var tools = {
      dimensions: function (elems, val, dimension) {
        if (elems.length === 0) {
            return null;
        }
        if (val !== undefined && val !== null) {
            if (val === '') {
                elems.removeStyle(dimension);
            }
            else if (val === 'auto') {
                elems.setStyle(dimension, 'auto');
            }
            else if ( val == parseInt(val, 10) ) {
                elems.setStyle(dimension, val + 'px');
            }
            else if (!isNaN(parseInt(val, 10))) {
                var intVal = parseInt(val, 10);
                var ext = val.slice(-2);
                var perc = val.slice(-1);
                if ( ((ext === 'em' || ext === 'px') && (intVal + ext) === val)
                    || (perc === '%' && (intVal + perc) === val) ) {
                    elems.setStyle(dimension, val);
                }
            }

            return elems;
        }
        else {
            var el = elems[0];
            if (el.nodeType === document.nodeType) { //dim of html document
                el = document.firstElementChild;
            }
            if (dimension === 'height') {
                if ($$.isWindow(el)) {
                    return window.innerHeight;
                }
                var cmpPadTop = parseInt(this.getCmpStylePropValue(el, 'padding-top'), 10);
                var cmpPadBot = parseInt(this.getCmpStylePropValue(el, 'padding-bottom'), 10);
                if (isNaN(cmpPadTop) || isNaN(cmpPadBot)) {
                    return null;
                }
                else {
                    return (el.clientHeight - cmpPadTop - cmpPadBot);
                }
            }
            if (dimension === 'width') {
                if ($$.isWindow(el)) {
                    return window.innerWidth;
                }
                var cmpPadLeft = parseInt(this.getCmpStylePropValue(el, 'padding-left'), 10);
                var cmpPadRight = parseInt(this.getCmpStylePropValue(el, 'padding-right'), 10);
                if (isNaN(cmpPadLeft) || isNaN(cmpPadRight)) {
                    return null;
                }
                else {
                    return (el.clientWidth - cmpPadLeft - cmpPadRight);
                }
            }
        }
    }

    , getCmpStylePropValue: function (el, property) {
        var cmpStyle = document.defaultView.getComputedStyle(el, null);
        if (cmpStyle === null) {
            return null;
        }
        else {
            return cmpStyle.getPropertyValue(property);
        }
    }
};
