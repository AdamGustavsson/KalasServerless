//var SmsGateway = require('smsgateway');
const fetch = require("node-fetch");
const token = process.env.SMS_GATEWAY_TOKEN;
const deviceId = process.env.SMS_GATEWAY_DEVICE_ID;

function sendSMS (number, message) {
  console.log('Sending SMS to number:' + number + ' with message: ' + message);
  var body = [{
    "phone_number": number,
    "message": message,
    "device_id": deviceId
  }]
  return fetch('https://smsgateway.me/api/v4/message/send', { method: 'POST',headers: {'Authorization': token}, body: JSON.stringify(body) })

}


module.exports = {sendSMS};
