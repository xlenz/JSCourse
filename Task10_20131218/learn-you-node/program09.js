var http = require('http');

httpGet();

var count = 2;
function httpGet () {
    var url = process.argv[count];
    count++;
    if (count > 5)
        return;
    http.get(url, function (res) {
        res.setEncoding('utf8');
        var data = '';
        res.on('data', function (chunk) {
            data += chunk;
        }).on('end', function (end) {
            console.log(data);
            httpGet();
        });
    }).on('error', function(e) {
        console.error('GET error: ', e);
    });
}
