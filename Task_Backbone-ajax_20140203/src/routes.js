'use strict';

var self = this;
var api, html;
module.exports = function (cfg) {
  html = require('./controllers/html')(cfg);
  //var api = require('./controllers/api');
  return self;
};

exports.routes = function (app) {
  app.get("/", html.rootHtml);
  //app.get("/", api.blabla);
};
