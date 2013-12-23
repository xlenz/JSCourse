var dup = require('duplexer');
var spawn = require('child_process').spawn;

module.exports = function (cmd, args) {
    var proc = spawn(cmd, args);
    //debug
    proc.stdout.on('data', function(data) {
        console.log(data.toString());
    });
    return dup(proc.stdin, proc.stdout);
};
