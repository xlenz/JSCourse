var express = require('express');
var request =  require('request');
var app = express();

app.get('/search', function (req, res) {
    res.send(req.query).end();
});

app.listen(process.argv[2]);

request.get({
    url: 'http://localhost:3000/search/?results=recent&include_tabs=true'},
    function(e, r, body) {
        console.log(body);
});

