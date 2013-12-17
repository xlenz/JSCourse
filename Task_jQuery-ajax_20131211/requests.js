var app;
var log;
var logWho;
var tools;
var helpers;
exports.init = function (init) {
    app = init.app;
    log = init.log;
    logWho = init.logWho;
    tools = init.tools;
    helpers = init.helpers;
}

setTimeout(function() {
    app.get("/", function (req, res) {
        logWho(req);
        log.trace('Sending ' + tools.root_html);
        res.setHeader("Content-Type", "text/html");
        res.send(tools.root_html);
    });

}, 1000);
