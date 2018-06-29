var keystone = require('keystone');
var Types = keystone.Field.Types;

/**
 * OrganisationType Model
 * ===================
 */

var OrganisationTypes = new keystone.List('OrganisationTypes', {
	track: true,
	autokey: { path: 'key', from: 'name', unique: true }
});

OrganisationTypes.add({
	name: { type: String, index: true },
    state: { type: Types.Select, options: 'draft, published, archived', default: 'draft', index: true },
    publishedDate: { type: Types.Date, index: true }
});


/**
 * Relationships
 * =============
 */


/**
 * Registration
 * ============
 */

OrganisationTypes.defaultColumns = 'name, state';
OrganisationTypes.register();
