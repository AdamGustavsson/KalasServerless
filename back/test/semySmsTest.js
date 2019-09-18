'use strict';
const smsgateway = require('../api/lib/smsgateway');


const number = '+46706330212';
const message = "Medelande från kod på laptop + / ' & ";
smsgateway.sendSMS(number,message)
.then(res => res.json()) // expecting a json response
.then(json => console.log(json));;
console.log("Number: " + number + " Text: " +message);
  
