var express = require('express');
//var request = require('request');

var app = express();
app.use(express.urlencoded());

app.post('/form', function(req, res) {
    res.end(reverse(req.body.str));
});
app.listen(process.argv[2]);

function reverse(s) {
    return s.split('').reverse().join('');
}
/*
request.post({
    url: 'http://localhost:3000/form',
    form: {str: '!haeY'}},
    function(e, r, body) {
        console.log(body);
});
*/
