//var SmsGateway = require('smsgateway');
const fetch = require("node-fetch");
const token = process.env.SMS_GATEWAY_SEMYSMS_TOKEN;
const deviceId = process.env.SMS_GATEWAY_SEMYSMS_DEVICE_ID;

function sendSMS (number, message) {
  console.log('Sending SMS to number:' + number + ' with message: ' + message);
  const url = 'https://semysms.net/api/3/sms.php?token=' + token + '&device=' + deviceId + '&phone=' + encodeURIComponent(number) + '&msg=' + encodeURIComponent(message);
  console.log(url);
  return fetch(url) 

}


module.exports = {sendSMS};
