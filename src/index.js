var builder = require('junit-report-builder');
var reporter = require('./reporter');

module.exports = function (config) {
  return reporter(config, builder);
};
