var ws = require('websocket-stream');
var stream = ws('ws://localhost:8000');
//stream.pipe('hello\n')
stream.end('hello\n');
