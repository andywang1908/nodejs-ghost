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

var Promise = require("bluebird")
var cheerio = require('cheerio')
var singleDraw = function(task, summary, tasks) {

//task = constant.urlBase + task + '?howMany=480'

if ( summary[task] ) {
  //console.log('skipped')
  return
}
var deals = []
var datetime = new Date()
var middleTasks = []

return util.crab(task)
.spread(function (response, body) {
  //util.logConsole('debug', "band list finish");
  //logFile("log/StepApply.html", body)

      var $ = cheerio.load(body)
  
      var subway = -1
      $('a.assortment-tile__text-heading__link').each(function(i, elem) {
        subway = i
        //console.log('>>>a:'+$(this).attr('href'))
        middleTasks.push( constant.urlBase + $(this).attr('href') )
      })

})
.then(function() {
    //console.log( middleTasks )

    return Promise.map(middleTasks, function(task) {
      console.log( '-->'+task )
      return util.crab(task)
      .then(function() {
        //fs.readFileAsync('ttc.txt')  
        util.logConsole('info', 'task is finish')
      })
      //return singleDraw.singleDraw(task, summary, tasks)
    }, {concurrency: 2}).then(function() {
      //console.log(summary)
      util.logFile('./task/canadiantire/kpi.json', JSON.stringify(summary) );
      console.log("All done in sub!!!")
    })
})
.then(function() {
  util.logConsole('info', 'great success for one thread!!')
})
.catch(function(e) {
  util.logConsole('error', "some exception to break:"+e)
})
.error(function(e) {
  util.logConsole('error', "some error to break"+e)
});
}
exports.singleDraw = singleDraw
