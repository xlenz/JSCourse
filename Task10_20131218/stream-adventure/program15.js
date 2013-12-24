var crypto = require('crypto');
var tar = require('tar');
var zlib = require('zlib');
var through = require('through');

var decrypt = crypto.createDecipher(process.argv[2], process.argv[3]);

var parser = tar.Parse();
parser.on('entry', function (e) {
    if (e.type !== 'File') return;

    var hash = crypto.createHash('md5', { encoding: 'hex' });

    e.pipe(hash).pipe(through(function(buf) {
        this.queue(buf + ' ' + e.path + '\n');
    })).pipe(process.stdout);
});

process.stdin.pipe(decrypt).pipe(zlib.createGunzip()).pipe(parser);
