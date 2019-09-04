//var SmsGateway = require('smsgateway');
const fetch = require("node-fetch");
const token = process.env.SMS_GATEWAY_SEMYSMS_TOKEN;
const deviceIds = process.env.SMS_GATEWAY_SEMYSMS_DEVICE_ID.split(',');
function getDeviceIndex(number,devices){
  console.log("in getDeviceIndex. Number: " + number + " devices: " + devices);
  number = number.trim();
  number = number.replace(/ /g,"");
  var lastDigits = number.substr(number.length -3);
  lastDigits =lastDigits.split("").reverse().join("");
  console.log("in getDeviceIndex. lastDigits: " + lastDigits + " rest: " + lastDigits % devices);

  return lastDigits % devices;
}

function sendSMS (number, message) {
  console.log('Sending SMS to number:' + number + ' with message: ' + message);
  console.log(deviceIds);
  var deviceId = deviceIds[getDeviceIndex(number,deviceIds.length)];
  console.log(deviceId);
  const url = 'https://semysms.net/api/3/sms.php?token=' + token + '&device=' + deviceId + '&phone=' + encodeURIComponent(number) + '&msg=' + encodeURIComponent(message);
  console.log(url);
  return fetch(url) 

}


module.exports = {sendSMS,getDeviceIndex};
