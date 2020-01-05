'use strict'
const mocha = require('mocha')
const notificar_slack = require('./slack-notification')
module.exports = Reporter

function Reporter (runner) {
  mocha.reporters.Base.call(this, runner)
  var self = this
  var failures = []
  var passes = []

  runner.on('pass', function(test) {
    passes.push(test)
  })

  runner.on('fail', function(test) {
    failures.push(test)
  })

  runner.on('end', function() {
    var obj = {
      stats: self.stats,
      failures: failures.map(clean),
      passes: passes.map(clean)
    }

    runner.testResults = obj
    process.stdout.write(JSON.stringify(obj.stats, null, 2))
    process.stdout.write('\n')

    if (failures.length > 0) {
      process.stdout.write(JSON.stringify(obj.failures, null, 2))
      notificar_slack(obj)
    }
  })
}

function clean(test) {
  var err = test.err || {}
  if (err instanceof Error) {
    err = errorJSON(err)
  }

  return {
    fullTitle: test.fullTitle(),
    title: test.title,
    duration: test.duration,
    currentRetry: test.currentRetry(),
    err: cleanCycles(err)
  }
}

function cleanCycles(obj) {
  var cache = []
  return JSON.parse(
    JSON.stringify(obj, function(key, value) {
      if (typeof value === 'object' && value !== null) {
        if (cache.indexOf(value) !== -1) {
          // Instead of going in a circle, we'll print [object Object]
          return '' + value
        }
        cache.push(value)
      }
      return value
    })
  )
}

function errorJSON(err) {
  var res = {}
  Object.getOwnPropertyNames(err).forEach(function(key) {
    res[key] = err[key]
  }, err)
  return res
}

mocha.utils.inherits(Reporter, mocha.reporters.Spec)
Reporter.description = 'Reporter ALCHIMIA'
