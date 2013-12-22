var through = require('through');
var split = require('split');

var odd = true;
var tr = through(function (buf) {
    var line = buf + '\n';
    line = odd ? line.toLowerCase() : line.toUpperCase();
    this.queue(line);
    odd = !odd;
});
process.stdin.pipe(split()).pipe(tr).pipe(process.stdout);
