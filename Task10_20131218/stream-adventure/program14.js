var crypto = require('crypto');
var decrypt = crypto.createDecipher('aes256', process.argv[2]);

process.stdin.pipe(decrypt).pipe(process.stdout);
