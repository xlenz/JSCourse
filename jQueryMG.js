
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

    elems.width = function (val) {
        if (elems === null || elems === undefined || elems.length === 0) {
            return null;
        }
        if (val !== null && val !== undefined) {
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
            var clientWidth = elems[0].clientWidth;
            var cmpPadLeft = parseInt(cmpStyle.getPropertyValue('padding-left'), 10);
            var cmpPadRight = parseInt(cmpStyle.getPropertyValue('padding-right'), 10);
            return (clientWidth - cmpPadLeft - cmpPadRight);
        }
    };

    elems.height = function (val) {
        if (elems === null || elems === undefined || elems.length === 0) {
            return null;
        }
        if (val !== null && val !== undefined) {
            //
        }
        else {
            //
        }
    };

    elems.delegate = function (selector, eventType, handler) {
        if (elems === null || elems === undefined || elems.length === 0) {
            return null;
        }
        if (typeof handler != 'function') {
            throw new Error('delegate: handler is not a function.');
        }
        if (typeof selector != 'string' || typeof eventType != 'string') {
            throw new Error('delegate: selector and eventType should be a string.');
        }
        elems.each(function(key, value) {
            var selElems = value.querySelectorAll(selector);
            $$.each(selElems, function(num) {
                if (!isNaN(num)) {
                    selElems[num].addEventListener(eventType, handler);
                }
            });
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
        $$.each(elems, function(key) {
            if (!isNaN(key)) {
                callback(key, elems[key]);
            }
        });
        return elems;
    };

    function setStyle(prop, value) {
        elems.each(function(key) {
            elems[key].style[prop] = value;
        });
    }

    return elems;
};

$$.each = function (obj, callback) {
    var forEachObjName = '$$.each';
    if (typeof callback != 'function') {
        throw new Error(forEachObjName + ': callback is not a function.');
    }
    if (obj === undefined || obj === null) {
        throw new Error(forEachObjName + ': object is undefined or null');
    }
    Object.keys(obj).forEach(function(key) {
        callback(key);
    });
};

