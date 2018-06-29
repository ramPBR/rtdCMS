var keystone = require('keystone'),
	moment = require('moment');


exports = module.exports = function(req, res) {
	
	var view = new keystone.View(req, res),
		locals = res.locals;
	
	locals.section = 'home';

	locals.page.title = 'Welcome to reThinkData';
	
	locals.user = req.user;
	
	// Load the first, NEXT meetup
	
	view.on('init', function(next) {		
				next();	
	});
	
	

	// Decide which to render
	
	view.on('render', function(next) {
			next();		
	});
	
	view.render('site/index');
	
}
