var net = require('net');
var util = require('util');

function dateNow () {
    var dt = new Date();
    var mn = addZero(dt.getMonth() + 1);
    var d = addZero(dt.getDate());
    var h = addZero(dt.getHours());
    var m = addZero(dt.getMinutes());
    return util.format('%s-%s-%s %s:%s', dt.getFullYear(), mn, d, h, m);
}

function addZero (n) {
    return n < 10 ? '0' + n : n;
}

var server = net.createServer(function (socket) {
    socket.write(dateNow());
    socket.end('\n');
});
server.listen(process.argv[2]);
