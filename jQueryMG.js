
var $$ = function (selector, element) {
    var elems = {};
    if (element !== null && element !== undefined) {
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
                removeStyle('width');
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
            var cmpWidth = parseInt(cmpStyle.getPropertyValue('width'), 10);
            var cmpPadLeft = parseInt(cmpStyle.getPropertyValue('padding-left'), 10);
            var cmpPadRight = parseInt(cmpStyle.getPropertyValue('padding-right'), 10);
            return (cmpWidth - cmpPadRight - cmpPadLeft) + 'px';
        }
    };
    function setStyle(prop, value) {
        $$.each(elems, function(key) {
            if (!isNaN(key)) {
                elems[key].style[prop] = value;
            }
        });
    }
    function removeStyle(style) {
        $$.each(elems, function(key) {
            if (!isNaN(key)) {
                elems[key].style.removeProperty(style);
            }
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

