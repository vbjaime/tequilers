var express = require('express');
var router = express.Router();
var messages = require('./twilio');

function sendMessage(to, from, messageBody) {
  var answer;
  messages.create({
      to: to,
      from: from,
      body: messageBody,
    }, function (err, message) {
      if (err) {
        console.error(err);
        answer = null;
      } else {
        console.log(message.sid);
        return message;
      }
    });

  return answer;
}

router.route('/')
  .post(function (req, res) {
    console.log('Callback al crear');
    console.log(req.body);
    res.send('Loading the mesagge');
  })
  .get(function (req, res) {
    res.send('Message root');
  });

router.route('/send')
  .post(function (req, res) {
    console.log(JSON.stringify(req.body));
    var answer = sendMessage(req.body.to, req.body.from, req.body.message);
    if (answer !== null) {
      res.json({ message: answer });
    }else {
      res.json({ message: 'Error trying to send message' });
    }
  })
  .get(function (req, res) {
      res.send('Sender message');
    });

router.route('/getmessages')
  .get(function (req, res) {
    messages.list({}, function (err, data) {
        console.log('Printing the SMS');
        data.messages.forEach(function (message) {
          var answer = {
            to: message.to,
            from: message.from,
            body: message.body,
            status: message.status,
          };
          if (message.direction == 'inbound') {
            console.log(message);
          }
        });
      });

    res.send('Get messages');
  });

module.exports = router;
