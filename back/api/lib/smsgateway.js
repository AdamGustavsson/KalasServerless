if(process.env.SMS_GATEWAY_SERVICE=='SEMYSMS'){
  var smsgateway = require('./smsgatewaysemysms');
} else{
  var smsgateway = require('./smsgatewaysmsgateway');
} 
function sendSMS (number, message) {
  return smsgateway.sendSMS(number,message);
}


module.exports = {sendSMS};
