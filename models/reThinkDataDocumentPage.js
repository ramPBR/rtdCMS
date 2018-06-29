var keystone = require('keystone');
var Types = keystone.Field.Types;

/**
 * Documents Model
 * ===================
 */

var reThinkDataDocumentPage = new keystone.List('reThinkDataDocumentPage', {
    track: true,
    autokey: { path: 'key', from: 'name', unique: true }
});

reThinkDataDocumentPage.add({
    name: { type: String, index: true },
    description: { type: Types.Html, wysiwyg:true, height: 400, width:400  },
    organisationType: { type: Types.Relationship, ref: 'OrganisationTypes' },
    state: { type: Types.Select, options: 'draft, published, archived', default: 'draft', index: true }
});


/**
 * Relationships
 * =============
 */




/**
 * Registration
 * ============
 */

reThinkDataDocumentPage.defaultColumns = 'name';
reThinkDataDocumentPage.register();
