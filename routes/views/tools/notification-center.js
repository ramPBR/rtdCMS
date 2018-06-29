var keystone = require('keystone');
var async = require('async');
var Email = require('keystone-email');

var User = keystone.list('User');

exports = module.exports = function(req, res) {

	var view = new keystone.View(req, res),
		locals = res.locals;

	locals.section = 'tools';
	locals.nextMeetup = false;


	// Keep it secret, keep it safe

	if (!req.user || req.user && !req.user.isAdmin) {
		console.warn('===== ALERT =====');
		console.warn('===== A non-admin attempted to access the Notification Center =====');
		return res.redirect('/');
	}


	// Get the next meetup

	view.on('init', function(next) {		
					next();	
	});


	view.render('tools/notification-center');

}
