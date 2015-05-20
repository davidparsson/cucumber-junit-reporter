var _ = require('lodash');
var path = require('path');

function cucumberJUnitReporter(providedConfig, builder) {

  var config = _.defaults(providedConfig || {}, {
    reportDir: 'test_reports',
    reportPrefix: 'TEST-',
    reportSuffix: '.xml',
    reportFile: 'test_results.xml',
    oneReportPerFeature: true,
    numberSteps: true
  });

  var suite = builder;
  var featurePath;
  var featureName;
  var scenarioName;
  var stepCounter = 0;

  function getCurrentTestClassName() {
    var testClassName = '';
    if (featureName) {
      testClassName += 'Feature: ' + featureName.replace(/\./g, ' ');
    }
    if (scenarioName) {
      testClassName += '.Scenario: ' + scenarioName.replace(/\./g, ' ');
    }
    return testClassName;
  }

  function getFeatureReportPath() {
    var reportName = config.reportPrefix +
      featurePath.replace(/[\/]/g, '.') +
      config.reportSuffix;
    return path.join(config.reportDir, reportName);
  }

  function getGlobalReportPath() {
    return path.join(config.reportDir, config.reportFile);
  }

  function getStepName(stepCount, step) {
    var name = '';
    if (config.numberSteps) {
      if (stepCount < 10) {
        name += '0';
      }
      name += stepCount + '. ';
    }
    name += step.getKeyword() + step.getName();
    return name;
  }

  function formatTime(duration) {
    if (typeof duration === 'number') {
      return Math.round(duration / 1e6) / 1e3;
    }
    return null;
  }

  function registerHandlers() {

    this.registerHandler('BeforeFeature', function (event, callback) {
      var feature = event.getPayloadItem('feature');
      featureName = feature.getName();
      featurePath = path.relative(process.cwd(), feature.getUri());
      suite = builder.testSuite().name(featureName);
      callback();
    });

    this.registerHandler('BeforeScenario', function (event, callback) {
      var scenario = event.getPayloadItem('scenario');
      scenarioName = scenario.getName();
      stepCounter = 0;
      callback();
    });

    this.registerHandler('StepResult', function (event, callback) {
      var stepResult = event.getPayloadItem('stepResult');
      var step = stepResult.getStep();
      var stepName = step.getName();

      if (typeof stepName === "undefined" && stepResult.isSuccessful()) {
        callback();
        return;
      }

      stepCounter++;

      var testCase = suite.testCase()
        .className(getCurrentTestClassName())
        .name(getStepName(stepCounter, step));

      if (stepResult.isSuccessful()) {
        testCase.time(formatTime(stepResult.getDuration()));
      } else if (stepResult.isSkipped()) {
        testCase.skipped();
      } else if (!stepResult.isPending() && !stepResult.isUndefined()) {
        var failureException = stepResult.getFailureException();
        testCase.failure(failureException).time(formatTime(stepResult.getDuration()));
        if (failureException.stack) {
          testCase.stacktrace(failureException.stack);
        }
      }
      callback();
    });

    this.registerHandler('AfterScenario', function (event, callback) {
      scenarioName = undefined;
      callback();
    });

    this.registerHandler('AfterFeature', function (event, callback) {
      if (config.oneReportPerFeature) {
        builder.writeTo(getFeatureReportPath());
        builder = builder.newBuilder();
      }

      featureName = undefined;
      featurePath = undefined;
      suite = builder;
      callback();
    });

    this.registerHandler('AfterFeatures', function (event, callback) {
      if (!config.oneReportPerFeature) {
        builder.writeTo(getGlobalReportPath());
      }
      callback();
    });

  }

  return registerHandlers;
}

module.exports = cucumberJUnitReporter;
