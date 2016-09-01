var urlBase = "http://10.160.200.141:10039"
var urlBase = "http://10.160.200.182:10039"
var urlBase = "https://www.services.gov.on.ca"
exports.urlBase = urlBase

//apply page
//https://www.services.gov.on.ca/sodp/poc/s2i?uri=s2i:s2iLanding_hot01&lang=en&_ga=1.118928718.655254388.1460402139
//&s2iByPassCode=3hQpqYQ1HP7XG6Q
var urlApply = urlBase + "/sodp/poc/s2i?uri=s2i:s2iLanding_hot01&lang=en"
exports.urlApply = urlApply

//----------------------------------above same for all server except urlBase
var plateNumber = 'BPBP200'
exports.plateNumber = plateNumber

//hard to get through js
//141 daniel
var urlPlateNumber = urlBase + "/sodp/portal/s2i/!ut/p/b1/dcpbjoIwFADQtbAAc2-JFvrZEEBsKyiIpT-EGEN8AA4YHrN6nQXM50kOGChWFB3KXEYd0GDaarzV1fvWtdXzz4aWe5VsTyIkiHxjI5d54JNjbmOEUHyD818IlQ0ZaFyX6X3q7KU9ikyt4-XAoswv8zvOMVFjgjgmkql-P_QnMXmCnvXjOdcFbXTzuuo-okPy685ySdmWED8OOv0j0s1Oeo83GVZEBBefS3Nwd5MF6bUtPQ6NCceaW9YHwcFSHg!!/"
//182 demo
var urlPlateNumber = urlBase + "/sodp/portal/s2i/!ut/p/b1/dctZDoIwFEDRtbAA8_qYhE9CAKGtoKCW_hBiCHEAFAyDq1cX4OdNzgUJOa51jRioaioIkG05Xurydena8v5raRZbnmwONEAS-wkhDtMs9KNQIyGB_AvW_0DAVchAEL1Ir1OnLu2eZlyPl50dZl5xvJI5Rj5-jzFhNu-3Q3-gk0vNk7jd5zo3G9E8KtGH5pC8rZktqb1B9GK_E0-aGhFzby8cVkj9s-cwubOiSYG0agvXgUYGY-0oygdwYHgu/"
//production
var urlPlateNumber = urlBase + "/sodp/portal/s2i/!ut/p/b1/dc1LboMwFEDRtbCA6NmOwWaIKDTBpkBxqfEEoShC-QApRHyy-qQLyPBKR7pgoMSUME4J5wQ0mK6eTk19P_Vdff1v41T2R5GRLWOYhxFFnkyZslWBabSF8gXYOyBCBAo0olV-nnuydt9CxTRZM3evgqo4oyXB8ZQiNKXSjYevcfgRsy-cX325Lk3ptLq9HfWwd8b0wRe55u4O4yAJe_0ncjuS_uWOx81rcwg8aTIezRbkx67yPWjN59R4lvUEjBVc_Q!!/"  //plate number page
exports.urlPlateNumber = urlPlateNumber

//get from console not in page source
var urlSurvey = urlBase + "/sodp/s2i/S2I_AjaxProxy/S2iProxy/http/intradev.services.ebc.gov.on.ca%3a8080/S2I/services/FormGenerator/s2i/hot_form?hostPath=http://10.160.200.141:10039"
var urlSurvey = urlBase + "/sodp/s2i/S2I_AjaxProxy/S2iProxy/http/intradev.services.ebc.gov.on.ca%3a8080/S2I/services/FormGenerator/s2i/hot_form?hostPath=http://10.160.200.182:10039"
var urlSurvey = urlBase + "/sodp/s2i/S2I_AjaxProxy/S2iProxy/http/localhost%3a8080/S2I/services/FormGenerator/s2i/hot_form?hostPath=https://www.services.gov.on.ca"
exports.urlSurvey = urlSurvey
