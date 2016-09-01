var util = require('../../util.js')
var constant = require('./constant.json')  //.dan .demo
/*
constant.formPlateNumber = { step: '1'
  , plateSearchString1: constant.plateNumber
  , plateSearchString2: constant.plateNumber
  //, prevPlateNum: constant.plateNumber
  , termOfUse: 'true'
  , simulator: 'true'
}
var calFullUrl = function(part) {
  return constant.urlBase + part
}*/

var cheerio = require('cheerio')
var Promise = require("bluebird");
var mapTask = function(tasks) {

return util.crab(constant.urlApply)
.spread(function (response, body) {
  util.logFile("log/StepApply.html", body)
  //return util.crab(constant.urlPlateNumber)

  var $ = cheerio.load(body)
  $('a.view-all-link').each(function(i, elem) {
    //console.log( $(this).attr('href') )
    var href = constant.urlBase + $(this).attr('href')
    //console.log('href:',href)
    tasks.push( href )
  })
})
.then(function() {
  //fs.readFileAsync('ttc.txt')  
  util.logConsole('info', 'great success for one thread!')
})
.catch(function(e) {
  util.logConsole('error', 'some exception to break:'+e)
})
.error(function(e) {
  util.logConsole('error', 'some error to break:'+e)
})
}
exports.mapTask = mapTask
