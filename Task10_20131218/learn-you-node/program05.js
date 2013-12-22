var fs = require('fs');
var fExt = process.argv[3];
var regex = new RegExp('\\.' + fExt + '$');

fs.readdir(process.argv[2], function(err, list) {
    for (var i = 0; i < list.length; i++) {
        if (!fExt) {
            console.log(list[i]);
        }
        else if ( regex.test(list[i]) ) {
            console.log(list[i]);
        }
    }
});
