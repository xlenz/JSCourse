var fs = require('fs');
var path = process.argv[2];
if (!path) return;

fs.readFile(path, function (err, fileContent) {
    if (err) return;
    var linesCount = fileContent.toString().split('\n').length - 1;
    console.log(linesCount);
});
