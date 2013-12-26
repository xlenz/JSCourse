var express = require('express');
var crypto =  require('crypto');
//var request =  require('request');
var app = express();

app.put('/message/:id', function (req, res) {
    var dateNow = new Date().toDateString();
    var id = req.params.id;
    console.log(id);
    var hash = crypto.createHash('sha1').update(dateNow + id).digest('hex');
    res.end(hash);
});

app.listen(process.argv[2]);

/*
request.put({
    url: 'http://localhost:3000/message/superId'},
    function(e, r, body) {
        console.log(body);
});
*/
