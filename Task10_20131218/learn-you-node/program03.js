var fs = require('fs');
var path = process.argv[2];
if (!path) return;

var fileContent = fs.readFileSync(path).toString();
var linesCount = fileContent.split('\n').length - 1;

console.log(linesCount);
