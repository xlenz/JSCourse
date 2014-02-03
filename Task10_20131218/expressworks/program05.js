var express = require('express');
var app = express();
app.use(require('stylus').middleware(process.argv[3] || __dirname));
app.use(express.static(process.argv[3] || __dirname));
app.listen(process.argv[2]);
