'use strict'

var Util = require('../../util.js')
var constant = require('./constant.json') //.dan .demo

var Promise = require('bluebird')
var cheerio = require('cheerio')
var singleDraw = function(task, summary, tasks) {

  if (summary[task]) {
    return
  }
  var deals = []
  var datetime = new Date()
  var middleTasks = []

  return Util.crab(task)
    .spread(function(response, body) {
      //Util.logConsole('debug', 'band list finish');
      //logFile('log/StepApply.html', body)

      var $ = cheerio.load(body)

      var subway = -1
      $('a.assortment-tile__text-heading__link').each(function(i, elem) {
        subway = i
          //console.log('>>>a:'+$(this).attr('href'))
        middleTasks.push(constant.urlBase + $(this).attr('href'))
      })

    })
    .then(function() {
      //console.log( middleTasks )

      return Promise.map(middleTasks, function(task) {
        console.log('-->' + task)
        return Util.crab(task)
          .then(function() {
            //fs.readFileAsync('ttc.txt')
            Util.logConsole('info', 'task is finish')
          })
          //return singleDraw.singleDraw(task, summary, tasks)
      }, { concurrency: 2 }).then(function() {
        //console.log(summary)
        Util.logFile('./task/canadiantire/kpi.json', JSON.stringify(summary))
      })
    })

}
exports.singleDraw = singleDraw