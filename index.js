'use strict'

require('events').EventEmitter.prototype._maxListeners = 100
var Util = require('./util.js')
var Promise = require('bluebird')

var urlRoot = 'http://www.canadiantire.ca/en/kids-zone/baby-toddler/car-seats-accessories.html'

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

//main('./task/canadiantire/')

//PATH=/home/andy/green/pro/activator/activator-1.3.10-minimal/bin:/home/andy/green/pro/selenium/driver:$PATH
var selenium = function() {

  var webdriver = require('selenium-webdriver'),
    By = webdriver.By,
    until = webdriver.until;

  var driver = new webdriver.Builder()
    .forBrowser('firefox')
    .build();

  driver.get('http://www.canadiantire.ca/en/kids-zone/baby-toddler/car-seats-accessories.html');
  driver.findElement(By.name('q')).sendKeys('webdriver');
  driver.findElement(By.name('btnG')).click();
  driver.wait(until.titleIs('webdriver - Google Search'), 5000);
  //driver.quit();

}
selenium()

var bite = function() {
  const Browser = require('zombie')
  var assert = require('assert')

  // We're going to make requests to http://example.com/signup
  // Which will be routed to our test server localhost:3000
  Browser.localhost('example.com', 3000)
  Browser.proxy = 'http://ebc%5Cwangan1:Ontario3%24@204.40.194.129:3128'


  const browser = new Browser()
  browser.proxy = 'http://ebc%5Cwangan1:Ontario3%24@204.40.194.129:3128'

  browser.visit('/signup', function() {
    const value = browser.getCookie('session');
    console.log(value + ':' + browser.location.href);
  });

  /*
  browser.fetch(url)
    .then(function(response) {
      console.log('Status code:', response.status);
      if (response.status === 200)
        return response.text();
    })
    .then(function(text) {
      //console.log('Document:', text);
      Util.logFile('log/StepApply.html', text)
    })
    .catch(function(error) {
      console.log('Network error');
    });*/

  browser.fetch(url, { waitFor: 10000 },
    function(err, browser) {
      // if I uncomment the following block, all non-Dojo tests pass.
      var loadEvent = browser.document.createEvent("HTMLEvents");
      loadEvent.initEvent("load", false, false);
      browser.window.dispatchEvent(loadEvent);

      // this fix also makes non-Dojo tests pass.
      //browser.fire("load", browser.window);

      // if I uncomment this line, onload passes but the load event does not.
      //if (browser.window.onload) browser.window.onload();

      self.callback(err, browser);
    }
  )
  .then(function(response) {
      console.log('Status code:', response.status);
      if (response.status === 200)
        return response.text();
  })
  .then(function(text) {
    //console.log('Document:', text);
    Util.logFile('log/StepApply.html', text)
  })
}

//bite()

var ghost = function() {

var phantom = require('phantom');

var sitepage = null;
var phInstance = null;
//'--ignore-ssl-errors=yes', 
phantom.create(['--load-images=no'], { logLevel: 'error' })
    .then(instance => {
        phInstance = instance;
        return instance.createPage();
    })
    .then(page => {
        sitepage = page;
        return page.open(urlRoot) //'https://stackoverflow.com/'
    })
    .then(status => {
        console.log(status);

        var image_file_name = 'abc.png';//url_to_process.replace(/\W/g, '_') + ".png"
        var image_path = "./" + image_file_name
        sitepage.render(image_path);

        return sitepage.property('content');
    })
    .then(content => {
        //console.log(content);
        Util.logFile('log/StepApply.html', content)
        sitepage.close();
        phInstance.exit();
    })
    .catch(error => {
        console.log(error);
        phInstance.exit();
    });

}

//ghost()
