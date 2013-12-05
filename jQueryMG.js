
var $$ = function (selector, element) {
    var elems = {};
    if (element != null) {
        elems = element.querySelectorAll(selector);
    }
    else {
        elems = document.querySelectorAll(selector);
    }

    elems.width = function (val) {
        if (elems == null || elems.length === 0) {
            return null;
        }
        if (val != null) {
            if (val === '') {
                removeStyle('width');
            }
            else if (val === 'auto') {
                setStyle('width', 'auto');
            }
            else if ( val == parseInt(val) ) {
                setStyle('width', val + 'px');
            }
            else if (!isNaN(parseInt(val))) {
                var intVal = parseInt(val);
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
            var cmpWidth = parseInt(cmpStyle.getPropertyValue('width'));
            var cmpPadLeft = parseInt(cmpStyle.getPropertyValue('padding-left'));
            var cmpPadRight = parseInt(cmpStyle.getPropertyValue('padding-right'));
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
}

