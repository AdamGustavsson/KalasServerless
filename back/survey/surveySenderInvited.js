'use strict';
var sleep = require('system-sleep');
const smsgateway = require('../api/lib/smsgateway');

require('fs').readFileSync('numbersInvited.csv').toString().split('\n').forEach(function (line) 
{ 
    sleep(5000); 
    const [number,childName] = line.split(';');
    const message = childName.trim() +" fick en kalasinbjudan på SMS från kalas.io. Hur funkade det för dig? Svara på 3 snabba frågor: https://sv.surveymonkey.com/r/3PNT5KK";
    smsgateway.sendSMS(number,message);
    console.log("Number: " + number + " Text: " +message);
  
}) 
