var fs = require('fs');

module.exports = function (path, ext, callback) {
    var regex = new RegExp('\\.' + ext + '$');
    fs.readdir(path, function(err, list) {
        if (err)
            return callback(err);

        list = list.filter(function (file) {
            if (!ext)
                return fs.lstatSync(file).isFile();
            return regex.test(file);
        });
        callback(null, list);
    });
}
