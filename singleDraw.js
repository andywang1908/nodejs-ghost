var Promise = require("bluebird")

var request = Promise.promisifyAll(require("request").defaults({ jar: true }), {multiArgs: true})
//var request = Promise.promisify(require("request"));
//request = Promise.promisifyAll(request);
//Promise.resolve(setTimeout(sleep, 3000)).then(function() {
//Promise.reject();

var cheerio = require('cheerio')
const fs = Promise.promisifyAll(require("fs"))
const winston = require('winston')
winston.level = 'info' //debug error info
var constant = require('./constant.demo.js')  //.dan .demo

constant.formPlateNumber = { step: '1'
  , plateSearchString1: constant.plateNumber
  , plateSearchString2: constant.plateNumber
  //, prevPlateNum: constant.plateNumber
  , termOfUse: 'true'
  , simulator: 'true'
};
constant.formContact = { step: '2'
  , plateSearchString1: constant.plateNumber
  , plateSearchString2: constant.plateNumber
  , simulator: 'true'

  //, hot01_plateInput1: constant.plateNumber
  //, hot01_plateInput2: constant.plateNumber
  , hot01_confirmVehicleYes: 'true'
  , confirmMyVehicle: 'true'
  , 'contactInfo.firstName': 'mario'
  , 'contactInfo.lastName': 'sankio'
  , 'contactInfo.phone': '4166758912'
  , 'contactInfo.email': 'mario.sankio@gmail.com'
  , 'emailReenter': 'mario.sankio@gmail.com'
}
/*clean others,or receive some other error*/
constant.formConfirm = {
  submitTo: "selectPaymentType" //get this value from console not source code
  ,viewName: ''
  ,certified: 'true'
  ,_certified: 'on'
}

var calFullUrl = function(part) {
  return constant.urlBase + part
}

var logFile = function(fileName, content) {
  //fs.writeFile(fileName, content)
}

var crab = function(urlNew) {
  var options = {
    url: urlNew
    //,proxy:'https://ebc\\wangan1:Ontario2$@204.40.194.129:3128'
    ,timeout: 30000
    ,headers: {
      "User-Agent": "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.16 (KHTML, like Gecko) \ Chrome/24.0.1304.0 Safari/537.16"
      //,'X-FORWARDED-FOR' : '10.160.200.141'
    }
  };

  return request.getAsync(options)
}

var brab = function(urlNew, formParams) {
  var options = {
    url: urlNew
    //,proxy:'https://ebc\\wangan1:Ontario2$@204.40.194.129:3128'
    ,timeout: 30000
    ,headers: {
      "User-Agent": "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.16 (KHTML, like Gecko) \ Chrome/24.0.1304.0 Safari/537.16"
      //,'X-FORWARDED-FOR' : '10.160.200.141'
    }
  };

  if ( constant.urlSurvey==urlNew ) {
    winston.log('info', "---------------survey")
    options.headers = {
      "User-Agent": "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.16 (KHTML, like Gecko) \ Chrome/24.0.1304.0 Safari/537.16"
      ,"content-type": "application/json"
    }

    //json: requestData
    var requestDataString = fs.readFileSync("survey.json")
    options.body = requestDataString
  } else {
    options.form = formParams
  }

  return request.postAsync(options);
}

var singleDraw = function() {
return crab(constant.urlApply)
.spread(function (response, body) {
  winston.log('debug', "StepApply finish");
  logFile("log/StepApply.html", body)
  return crab(constant.urlPlateNumber)
})
.spread(function (response, body) {
  winston.log('debug', "StepPlateNumber finish");
  logFile("log/StepPlateNumber.html", body)

  //get from hot01_drawForm.action to submit plate number
  var $ = cheerio.load(body);
  var action = calFullUrl( $('#hot01_drawForm').attr('action') )
  return brab(action, constant.formPlateNumber)
})
.spread(function (response, body) {
  winston.log('debug', "StepGhost finish");
  logFile("log/StepGhost.html", JSON.stringify(response))

  var urlContact = response.headers.location
  winston.log('debug', urlContact)
  return crab(urlContact)
})
.spread(function (response, body) {
  winston.log('debug', "StepContact finish");
  logFile("log/StepContact.html", body)//response

  //submit contact
  var $ = cheerio.load(body);
  var action = calFullUrl( $('#hot01_drawForm').attr('action') )
  return brab(action, constant.formContact)
})
.spread(function (response, body) {
  winston.log('debug', "StepGhost1 finish")
  logFile("log/StepGhost1.html", JSON.stringify(response))

  var urlContact = response.headers.location
  winston.log('debug', urlContact)
  return crab(urlContact)
})
.spread(function (response, body) {
  winston.log('debug', "StepSurvey finish")
  logFile("log/StepSurvey.html", body)//response

  var $ = cheerio.load(body)
  //for submit survey by portal , not submit survey by ajax
  constant.urlPortalSurvey = calFullUrl( $('form[name=hot01_surveyForm]').attr('action') )

  return brab(constant.urlSurvey)
})
.spread(function (response, body) {
  winston.log('debug', "StepGhost2 finish")
  logFile("log/StepGhost2.html", JSON.stringify(response))//response 

  var surveyResponseId = JSON.parse(body).responseId//3299
  winston.log('debug',  "surveyResponseId:"+surveyResponseId )
  return brab(constant.urlPortalSurvey, {SURVEY_RESULT_ID: surveyResponseId})
})
.spread(function (response, body) {
  winston.log('debug', "StepGhost3 finish");
  logFile("log/StepGhost3.html", JSON.stringify(response))//response

  var urlConfirm = response.headers.location
  winston.log('debug', urlConfirm)
  return crab(urlConfirm)
})
.spread(function (response, body) {
  winston.log('debug', "StepConfirm finish");
  logFile("log/StepConfirm.html", body)//response

  var $ = cheerio.load(body);
  //submit confirmation
  var action = calFullUrl( $('#s2iOrderSummary').attr('action') )

  throw new Error("little inn")
  return brab(action, constant.formConfirm)
})
.spread(function (response, body) {
  winston.log('debug', "StepGhost4 finish");
  logFile("log/StepGhost4.html", JSON.stringify(response))//response

  var urlConfirm = response.headers.location
  winston.log('debug', urlConfirm)
  return crab(urlConfirm)
})
.spread(function (response, body) {
  winston.log('debug', "StepFinal finish");
  logFile("log/StepFinal.html", body)//response

  var i = body.indexOf("var hotReceipt__navigateaway = true;")
  var i = body.indexOf("url: \"", i)
  var j = body.indexOf("\"", i+6)
  var urlConfirm = calFullUrl( body.substring(i+6, j) )
  winston.log('debug', urlConfirm)
  return brab(urlConfirm, {})  
})
.spread(function (response, body) {
  winston.log('debug', "StepFinalWait finish")
  logFile("log/StepFinalWait.html", JSON.stringify(response))
})
.then(function() {
  //fs.readFileAsync('ttc.txt')  
  winston.log('info', 'great success for one thread!')
})
.catch(function(e) {
  winston.log('error', "some exception to break:"+e)
})
.error(function(e) {
  winston.log('error', "some error to break"+e)
});
}
exports.singleDraw = singleDraw

//singleDraw()
