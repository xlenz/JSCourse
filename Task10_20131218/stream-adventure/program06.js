var concat = require('concat-stream');
var through = require('through');

var tr = through(function (buf) {
    return; //comment to debug
    var str = reverse(buf.toString());
    this.queue(str + '\n');
});

process.stdin.pipe(concat(function (buf) {
    console.log(reverse(buf.toString()));
    this.queue(buf);
})).pipe(tr).pipe(process.stdout);

function reverse(s) {
    return s.split('').reverse().join('');
}
