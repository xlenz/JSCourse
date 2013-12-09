
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

    var length = elems.length;

    elems.width = function (val) {
        if (length === 0) {
            return null;
        }
        if (val !== undefined && val !== null) {
            if (val === '') {
                elems.removeStyle('width');
            }
            else if (val === 'auto') {
                setStyle('width', 'auto');
            }
            else if ( val == parseInt(val, 10) ) {
                setStyle('width', val + 'px');
            }
            else if (!isNaN(parseInt(val, 10))) {
                var intVal = parseInt(val, 10);
                var ext = val.slice(-2);
                var perc = val.slice(-1);
                if ( ((ext === 'em' || ext === 'px') && (intVal + ext) === val)
                    || (perc === '%' && (intVal + perc) === val) ) {
                    setStyle('width', val);
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
    };

    elems.height = function (val) {
        if (length === 0) {
            return null;
        }
        if (val !== undefined && val !== null) {
            if (val === '') {
                elems.removeStyle('height');
            }
            else if (val === 'auto') {
                setStyle('height', 'auto');
            }
            else if ( val == parseInt(val, 10) ) {
                setStyle('height', val + 'px');
            }
            else if (!isNaN(parseInt(val, 10))) {
                var intVal = parseInt(val, 10);
                var ext = val.slice(-2);
                var perc = val.slice(-1);
                if ( ((ext === 'em' || ext === 'px') && (intVal + ext) === val)
                    || (perc === '%' && (intVal + perc) === val) ) {
                    setStyle('height', val);
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
    };

    elems.delegate = function (selector, eventType, handler) {
        if (length === 0) {
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
    };

    elems.removeStyle = function (style) {
        elems.each(function(key, value) {
            value.style.removeProperty(style);
        });
    }

    elems.each = function (callback) {
        if (typeof callback != 'function') {
            throw new Error('each: callback is not a function.');
        }
        for (var i = 0; i < length; i++) {
            callback(i, elems[i]);
        }
        return elems;
    };

    function setStyle(prop, value) {
        elems.each(function(key, val) {
            val.style[prop] = value;
        });
    }

    return elems;
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

