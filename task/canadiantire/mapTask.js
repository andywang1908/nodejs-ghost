'use strict'

var Util = require('../../util.js')
var constant = require('./constant.json') //.dan .demo

var Promise = require('bluebird')
var cheerio = require('cheerio')
var mapTask = function(tasks) {

  return Util.crab(constant.urlApply)
    .spread(function(response, body) {
      Util.logFile('log/StepApply.html', body)
        //return Util.crab(constant.urlPlateNumber)

      var $ = cheerio.load(body)
      $('a.view-all-link').each(function(i, elem) {
        //console.log( $(this).attr('href') )
        var href = constant.urlBase + $(this).attr('href')
          //console.log('href:',href)
        tasks.push(href)
      })
    })

}
exports.mapTask = mapTask