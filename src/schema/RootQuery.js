const graphql = require('graphql');
const { GraphQLObjectType, GraphQLID, GraphQLList } = graphql;

const { AuthorType, SongType, AlbumType } = require('./types');
const RootQuery = new GraphQLObjectType({
	name: 'Root',
	fields: {
		type: SongType,
		args: { id: { type: GraphQLID } },
		resolve: (parent, { id }) => Song.findById(id)
	},
	author: {
		type: AutorType,
		args: { id: { type: GraphQLID } },
		resolve: (parent, { id }) => Author.findById(id)
	},
	album: {
		type: GraphQLList(AlbumType),
		resolve: (parent, args) => Album.find({})
	},
	authors: {
		type: GraphQLList(AuthorType),
		resolve: (parent, args) => Author.find({})
	},
	songs: {
		type: GraphQLList(SongType),
		resolve: (parent, args) => Song.find({})
	}
});
module.exports = RootQuery;
