'use strict';
var sleep = require('system-sleep');
const smsgateway = require('../api/lib/smsgateway');

require('fs').readFileSync('numbers2.csv').toString().split('\n').forEach(function (line) 
{ 
    sleep(500); 
    const number = line.split(';')[0];
    const childName = line.split(';')[1];
    const message = "Ditt kalas för " + childName.trim() + " på kalas.io blev inte klart. Du har blivit utvald för vi tror du har värdefull feedback om hur vi kan bli bättre. Svara på 3 snabba frågor: https://sv.surveymonkey.com/r/6LZMKL3";
    smsgateway.sendSMS(number,message);
    console.log("Number: " + number + " Text: " +message);
  
}) 
