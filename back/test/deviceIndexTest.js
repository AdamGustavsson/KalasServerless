'use strict';
const smsgateway = require('../api/lib/smsgatewaysemysms');


const number = '+46706330310';
console.log(smsgateway.getDeviceIndex(number,2))

