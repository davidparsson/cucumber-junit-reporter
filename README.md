cucumber-junit-reporter
=======================

A support hook generating Jenkins compatible XML based JUnit for [cucumber-js](https://github.com/cucumber/cucumber-js).

Installation
------------

To install the latest version, run:

    npm install cucumber-junit-reporter --save

Usage
-----

```JavaScript
var reporter = require('cucumber-junit-reporter');

module.exports = reporter({
  reportDir: 'build/test_results/e2e/'
});
```

License
-------

MIT. See [LICENSE](https://github.com/davidparsson/cucumber-junit-reporter/blob/master/LICENSE).

Changelog
---------

### 0.0.1
- Initial release
