// Twilio Credentials
var accountSid = 'AC6220f5e84b5e7f9e5794774917aa7271';
var authToken = '0c163cc1dc5a97992388a555fe02b629';

//require the Twilio module and create a REST client
var client = require('twilio')(accountSid, authToken);

module.exports = client.messages;
