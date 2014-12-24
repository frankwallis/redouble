var path = require('path');
var notifier = require('node-notifier');

function notify (msg) {
	notifier.notify({
	  	title: 'v2 gulp tasks',
	  	message: msg,
	  	icon: path.join(__dirname, 'info.png'),
	  	sound: true, // Only Notification Center or Windows Toasters
	  	wait: false // wait with callback until user action is taken on notification
	}, function (err, response) {
	  	// response is response from notification
	});
}

function error (msg) {
	notifier.notify({
	  	title: 'v2 gulp tasks',
	  	message: msg,
	  	icon: path.join(__dirname, 'error.png'),
	  	sound: true, // Only Notification Center or Windows Toasters
	  	wait: false // wait with callback until user action is taken on notification
	}, function (err, response) {
	  	// response is response from notification
	});
}

module.exports.notify = notify;
module.exports.error = error;
