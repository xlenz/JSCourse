var express = require('express');
var fs = require('fs');
var request =  require('request');

var file = fs.readFileSync(process.argv[3] || 'program08.json');
var obj = JSON.parse(file);

var app = express();

app.get('/books', function (req, res) {
    res.json(obj).end();
});

app.listen(process.argv[2]);

request.get({
    url: 'http://localhost:3000/books'},
    function(e, r, body) {
        console.log(body);
});

