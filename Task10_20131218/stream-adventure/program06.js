var concat = require('concat-stream');

process.stdin.pipe(concat(function (buf) {
    console.log( reverse(src.toString()) );
}));

function reverse(s) {
    return s.split('').reverse().join('');
}
