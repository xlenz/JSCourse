var http = require('http');
var fs = require('fs');

var server = http.createServer(function (req, res) {
    if (req.method != 'POST')
        return res.end('only POST is supported.');
    req.setEncoding('utf8');
    var data = '';
    req.on('data', function (chunk) {
        data += chunk;
    }).on('end', function () {
        return res.end(data.toUpperCase());
    });
});
server.listen(process.argv[2]);
