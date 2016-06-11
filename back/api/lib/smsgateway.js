var SmsGateway = require('smsgateway');


const gateway = new SmsGateway(process.env.SMS_GATEWAY_USERNAME,process.env.SMS_GATEWAY_PASSWORD)

function sendSMS (number, message) {
  console.log('Sending SMS to number:' + number + ' with message: ' + message);

  return gateway.send(number, message,process.env.SMS_GATEWAY_DEVICE_ID)
}


module.exports = {sendSMS};
