'use strict'

require('events').EventEmitter.prototype._maxListeners = 100
var Util = require('./util.js')
var Promise = require('bluebird')

var main = function(taskFolder) {
  var tasks = [] //new Array(1)
  //var summary = require(taskFolder+'kpi.json')
  var summary = {} //restart
  Util.logConsole('info', 'Finished tasks number:' + Object.keys(summary).length)

  genHtml(summary, taskFolder)

  var mapTask = require(taskFolder + 'mapTask.js')
  var singleDraw = require(taskFolder + 'singleDraw.js')
  mapTask.mapTask(tasks)
    .then(function() {
      Util.logConsole('info', 'tasks are created!')
      tasks = tasks.slice(0, 1)
      //util.logConsole('debug', tasks)

      //return
      return Promise.map(tasks, function(task) {
        return singleDraw.singleDraw(task, summary, tasks)
      }, { concurrency: 5 }).then(function() {
        return Util.logFile(taskFolder + 'kpi.json', JSON.stringify(summary))
      })
    })
    .then(function() {
      return Util.logConsole('info', 'Here must be last!!!')
    })
    .catch(function(e) {
      Util.logConsole('error', 'global exception to break:' + e)
    })
    .error(function(e) {
      Util.logConsole('error', 'global error to break:' + e)
    })
}

var genHtml = function(summary, taskFolder) {
  //write summary to html
  var html = ''
  var htmlCount = 0
  for (var key in summary) {
    if (summary.hasOwnProperty(key)) {
      var deals = summary[key]
      var dealsLength = deals.length

      for (var i = 0; i < dealsLength; i++) {
        if (deals[i]['ratio'] <= 0.7) { // && key.indexOf('category')>-1
          html += '<li>' + deals[i]['brand'] + ':' + deals[i]['p1'] + ':cheap to:' + deals[i]['p2'] + ':' + deals[i]['ratio'] + ':' + '<a href="' + deals[i]['href'] + '" target="_blank">' + deals[i]['desc'] + '</a><imga src="' + deals[i]['icon'] + '"/></li>\n'
          htmlCount++
        }
      }
    }
  }
  Util.logFile(taskFolder + 'summary.html', '<li>total:' + htmlCount + '</li>' + html)
  //return
}

main('./task/canadiantire/')