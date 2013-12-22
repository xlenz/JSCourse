var http = require('http');
var through = require('through');

var server = http.createServer(function (req, res) {
    if (req.method != 'POST')
        return res.end('Only POST is supported.');
    req.setEncoding('utf8');
    req.pipe(through(function (buf) {
        this.queue(buf.toUpperCase());
    })).pipe(res);
});
server.listen(process.argv[2]);
