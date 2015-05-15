cucumber-junit-reporter
=======================

[![Build Status](https://travis-ci.org/davidparsson/cucumber-junit-reporter.svg?branch=master)](https://travis-ci.org/davidparsson/cucumber-junit-reporter)
[![Dependency Status](https://david-dm.org/davidparsson/cucumber-junit-reporter.svg)](https://david-dm.org/davidparsson/cucumber-junit-reporter)
[![devDependency Status](https://david-dm.org/davidparsson/cucumber-junit-reporter/dev-status.svg)](https://david-dm.org/davidparsson/cucumber-junit-reporter#info=devDependencies)

A support hook generating [Jenkins](http://jenkins-ci.org/) compatible XML based JUnit reports for [cucumber-js](https://github.com/cucumber/cucumber-js).

Installation
------------

To install the latest version, run:

    npm install cucumber-junit-reporter --save

Usage
-----


Create a file in cucumber's `support` directory containing the following:

```JavaScript
var reporter = require('cucumber-junit-reporter');

module.exports = reporter({
  reportDir: 'build/test_results/'
});
```

The `reporter` accepts the following config values:

- `reportDir` – The destination directory for the test reports. Default: `'test_reports'`.
- `oneReportPerFeature` – Default: `true`.
  - If `true` the reporter will create one report file per cucumber feature. The report file will be named based on `reportPrefix`, the feature file name and the `reportSuffix`.
  - If `false` the reporter will create a single report for all features, and the report name will be based on `reportFile`.
- `reportPrefix` – Default: `'TEST-'`.
- `reportSuffix` – Default: `'.xml'`.
- `reportFile` – Default: `'test_results.xml'`.
- `numberSteps` – If `true`, each step name in the report will be prefixed by its step number. This is useful when steps are sorter alphabetically. Default: `true`.


License
-------

[MIT](https://github.com/davidparsson/cucumber-junit-reporter/blob/master/LICENSE)

Changelog
---------

### 0.0.1
- Initial release
