var express = require('express');
var helpers = require('./helpers.js');
var tools = require('./tools.js');

var log = tools.logger;
helpers.logger(log);

var app = express(),
    http = require('http'),
    server = http.createServer(app);

app.configure(function () {
    app.use(express.static(__dirname + '/web'));
    app.use(express.cookieParser());
    //app.use(express.bodyParser()); //connect.multipart() will be removed in connect 3.0
    app.use(express.json());
    app.use(express.urlencoded());
    app.use(app.router);
    app.use(function (req, res, next) {
        res.status(404);
        log.warn('Not found URL:');
        logWho(req);
        return res.send({
            error: 'Resource not found',
            code: 404
        });
    });
    app.use(function (err, req, res, next) {
        res.status(err.status || 500);
        log.error('Internal error(%d): %s', res.statusCode, err.message);
        logWho(req);
        log.debug('req.body:\n', req.body);
        return res.send({
            error: err.message,
            code: 500
        });
    });
});

server.listen(tools.port, tools.host, function () {
    log.info('Listening - ' + (tools.host || '*') + ':' + (tools.port || 'default'));
});
tools.server(server);

function logWho (req) {
    log.debug(req.headers['x-forwarded-for'] || req.connection.remoteAddress + ' requests: ' + req.headers.host + req.url);
}

var myRequests = require('./requests.js');
myRequests.init({
    app: app,
    log: log,
    logWho: logWho,
    tools: tools,
    helpers: helpers
});
