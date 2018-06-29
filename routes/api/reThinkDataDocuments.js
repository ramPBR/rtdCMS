var async = require('async'),
	moment = require('moment'),
	keystone = require('keystone');

var Documents = keystone.list('reThinkDataDocumentPage'),
    organisationTypes = keystone.list('OrganisationTypes');

exports = module.exports = function(req, res) {

    var orgId = '';
    console.log("orgId "+orgId);
	
	async.series([
		function (next) {
            organisationTypes.model.find()
                .where('key', req.params.id)
                .where('state', 'published')
                .exec(function(err, docs) {
                    orgId= docs[0]._id;
                    return next();
                });
        },	
		function(next) {
            Documents.model.find()                
                .where('organisationType', orgId)
                .where('state', 'published')
				.exec(function(err, docs) {
                    return res.apiResponse(docs);					
				});	
		}	
	], function(err) {
	
		return res.apiResponse(docs);
	
	});

}
