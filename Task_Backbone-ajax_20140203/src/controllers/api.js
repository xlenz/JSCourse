'use strict';

var helpers = require('./../helpers');
var validateQuery = helpers.validateQuery;
var sendMessage = helpers.sendMessage;

var self = this;
var dbMysql;
module.exports = function (_dbMysql) {
  dbMysql = _dbMysql;
  return self;
};

//just a template :)

exports.notImplemented = function (req, res, next) {
  throw new Error('notImplemented');
};
