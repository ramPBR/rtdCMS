import {
	GraphQLBoolean,
	GraphQLSchema,
	GraphQLID,
	GraphQLInt,
	GraphQLList,
	GraphQLNonNull,
	GraphQLObjectType,
	GraphQLString,
	GraphQLEnumType,
} from 'graphql';

var keystoneTypes = require('./keystoneTypes');

var keystone = require('keystone');


var User = keystone.list('User');

var Organisation = keystone.list('Organisation');


var userType = new GraphQLObjectType({
	name: 'User',
	fields: () => ({
		id: { type: new GraphQLNonNull(GraphQLID) },
		name: { type: new GraphQLNonNull(keystoneTypes.name) },
		// email: {
		// 	type: keystoneTypes.email,
		// 	resolve: (source) => ({
		// 		email: source.email,
		// 		gravatarUrl: source._.email.gravatarUrl,
		// 	}),
		// },
		
	}),
});


var organisationType = new GraphQLObjectType({
	name: 'Organisation',
	fields: () => ({
		id: { type: new GraphQLNonNull(GraphQLID) },
		name: { type: GraphQLString },
		logo: { type: keystoneTypes.cloudinaryImage },
		website: { type: GraphQLString },
		isHiring: { type: GraphQLBoolean },
		description: { type: keystoneTypes.markdown },
		location: { type: keystoneTypes.location },
		members: {
			type: new GraphQLList(userType),
			resolve: (source, args) =>
				User.model.find().where('organisation', source.id).exec(),
		},
	}),
});

var queryRootType = new GraphQLObjectType({
	name: 'Query',
	fields: {
		organisation: {
			type: organisationType,
			args: {
				id: {
					description: 'id of the organisation',
					type: new GraphQLNonNull(GraphQLID),
				},
			},
			resolve: (_, args) => Organisation.model.findById(args.id).exec(),
		},
		users: {
			type: new GraphQLList(userType),
			resolve: (_, args) =>
				User.model.find().exec(),
		},
		user: {
			type: userType,
			args: {
				id: {
					description: 'id of the user',
					type: new GraphQLNonNull(GraphQLID),
				},
			},
			resolve: (_, args) => User.model.findById(args.id).exec(),
		},		
	},
});

export default new GraphQLSchema({
	query: queryRootType,
});
