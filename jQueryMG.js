
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

function MyArray (arr) {
    $$.each(MyArray.prototype, function(key) {
        arr[key] = MyArray.prototype[key];
    });
  return arr;
}

MyArray.prototype = {
      width: function (val) {
        var elems = this;
        if (this.length === 0) {
            return null;
        }
        if (val !== undefined && val !== null) {
            if (val === '') {
                elems.removeStyle('width');
            }
            else if (val === 'auto') {
                this.setStyle('width', 'auto');
            }
            else if ( val == parseInt(val, 10) ) {
                this.setStyle('width', val + 'px');
            }
            else if (!isNaN(parseInt(val, 10))) {
                var intVal = parseInt(val, 10);
                var ext = val.slice(-2);
                var perc = val.slice(-1);
                if ( ((ext === 'em' || ext === 'px') && (intVal + ext) === val)
                    || (perc === '%' && (intVal + perc) === val) ) {
                    this.setStyle('width', val);
                }
            }

            return elems;
        }
        else {
            var cmpStyle = document.defaultView.getComputedStyle(elems[0], null);
            var cmpPadLeft = parseInt(cmpStyle.getPropertyValue('padding-left'), 10);
            var cmpPadRight = parseInt(cmpStyle.getPropertyValue('padding-right'), 10);
            return (elems[0].clientWidth - cmpPadLeft - cmpPadRight);
        }
    }

    , height: function (val) {
        var elems = this;
        if (this.length === 0) {
            return null;
        }
        if (val !== undefined && val !== null) {
            if (val === '') {
                elems.removeStyle('height');
            }
            else if (val === 'auto') {
                this.setStyle('height', 'auto');
            }
            else if ( val == parseInt(val, 10) ) {
                this.setStyle('height', val + 'px');
            }
            else if (!isNaN(parseInt(val, 10))) {
                var intVal = parseInt(val, 10);
                var ext = val.slice(-2);
                var perc = val.slice(-1);
                if ( ((ext === 'em' || ext === 'px') && (intVal + ext) === val)
                    || (perc === '%' && (intVal + perc) === val) ) {
                    this.setStyle('height', val);
                }
            }

            return elems;
        }
        else {
            var cmpStyle = document.defaultView.getComputedStyle(elems[0], null);
            var cmpPadLeft = parseInt(cmpStyle.getPropertyValue('padding-left'), 10);
            var cmpPadRight = parseInt(cmpStyle.getPropertyValue('padding-right'), 10);
            return (elems[0].clientWidth - cmpPadLeft - cmpPadRight);
        }
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
            var selElems = el.querySelectorAll(selector);
            var seLength = selElems.length;
            for (var i = 0; i < seLength; i++) {
                selElems[i].addEventListener(eventType, handler);
            }
        });
        return elems;
    }

    , removeStyle: function (style) {
        var elems = this;
        elems.each(function(key, value) {
            value.style.removeProperty(style);
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
            val.style[prop] = value;
        });
        return elems;
    }
}
