var http = require('http');

http.get(process.argv[2], function (res) {
    res.setEncoding('utf8');
    var data = '';
    res.on('data', function (chunk) {
        data += chunk + '\n';
    }).on('end', function (end) {
        console.log(data);
    });
}).on('error', function(e) {
    console.error('GET error: ', e);
});
