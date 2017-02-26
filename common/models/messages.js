'use strict';

module.exports = function (Messages) {
	var modelMessage = require('./twilio'); 
	Messages.observe('after save', function(ctx, next) {
        console.log('here')
        if (ctx.instance) {
            var instance = ctx.instance;
            for (var prop in Messages) {
                console.log(prop + ': ' + typeof(Messages[prop]));
            }
        }
        next();
    });
    
	Messages.send = function(to, from, body, subject, priority, patientId, hospitalUserId, cb) {
		modelMessage.create({
			to: to,
			from: from,
			body: body
		}, function(err, message){
			if(!err){
				var idtemp=message.sid;
				var tmp = {
					'subject': subject,
					'sendTo': message.to,
					'message': message.body,
					'sendDate': message.date_created,
					'deliveryDate': message.date_sent,
					'priority': priority,
					'smsId': message.sid,
					'patientId': patientId,
					'hospitalUserId': hospitalUserId
				}
				Messages.create(tmp,function(err,obj){
					if(!err){
						console.log('Message saved');
						setTimeout(() => {
							console.log('5 segundos despues de mandarlo');
							modelMessage(idtemp).get(function(err, newMessage) { 
								if(!err){
									//console.log("Id: "+obj.getId());
									obj.updateAttribute('deliveryDate', newMessage.date_sent,function(err, instance){
										if(!err){
											console.log("Old one");
											console.log(obj);
											console.log("New one");
											console.log(instance);
										}else{
											console.log('Error: '+err);
										}
									});
									
								} else{
									console.log('Error: '+err);
								}
							}); 
							
						}, 5000);
					}else{
						console.log('Error: '+err);
					}
				});
				cb(null,message)
			}else{
				console.log('Error with send method: '+err);
			}
		}
		
		);
	}
	
	Messages.getmessages = function(cb) {
		modelMessage.list({},function (err, data){
			console.log('Printing the SMS');
			var answer = {};
			var msj = [];
			answer.msj = msj;
			data.messages.forEach(function (message){
				if(message.direction == 'inbound'){
					var tmp = {
				            to: message.to,
				            from: message.from,
				            body: message.body,
				            status: message.status,
		          	};
					answer.msj.push(tmp);
				}
			});
			cb(null,answer);
		});
	}
	
	Messages.remoteMethod('send', 
		{
			http: {path: '/message/send', verb: 'post'},
			accepts: [{arg: 'to', type: 'string'}, {arg: 'from', type: 'string'}, {arg: 'message', type: 'string'},
				{arg: 'subject', type: 'string'},{arg: 'priority', type: 'string'},{arg: 'patientId', type: 'string'},{arg: 'hospitalUserId', type: 'string'}],
			returns: {arg: 'message', type: 'string'}
		}
	);
	
	Messages.remoteMethod('getmessages', 
		{
			http: {path: '/message/get', verb: 'get'},
			returns: {arg: 'result', type: 'array'}
		}
	);
};
