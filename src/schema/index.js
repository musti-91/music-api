const graphql = require('graphql');
const Author = require('../Modal/Author');
const Song = require('../Modal/Song');
const Album = require('../Modal/Album');

const {
	GraphQLObjectType,
	GraphQLNonNull,
	GraphQLString,
	GraphQLID,
	GraphQLInt,
	GraphQLList,
	GraphQLSchema
} = graphql;

const SongType = new GraphQLObjectType({
	name: 'SongType',
	fields: () => ({
		id: { type: GraphQLID },
		name: { type: GraphQLString },
		length: { type: GraphQLString },
		author: { type: AuthorType, resolve: (parent, args) => Author.findById(parent.authorId) },
		album: { type: AlbumType, resolve: (parent, args) => Album.findById(parent.albumId) }
	})
});

const AlbumType = new GraphQLObjectType({
	name: 'AlbumType',
	fields: () => ({
		id: { type: GraphQLID },
		name: { type: GraphQLString },
		genre: { type: GraphQLString },
		released: { type: GraphQLString },
		author: { type: AuthorType, resolve: (parent, args) => Author.findById(parent.authorId) },
		songs: {
			type: GraphQLList(SongType),
			resolve: (parent, args) => Song.find({ albumId: parent.id })
		}
	})
});
const AuthorType = new GraphQLObjectType({
	name: 'AuthorType',
	fields: () => ({
		id: { type: GraphQLID },
		name: { type: GraphQLString },
		birthplace: { type: GraphQLString },
		age: { type: GraphQLInt },
		albums: {
			type: GraphQLList(AlbumType),
			resolve: (parent, args) => Album.find({ authorId: parent.id })
		}
	})
});
const RootQuery = new GraphQLObjectType({
	name: 'Root',
	fields: {
		song: {
			type: SongType,
			args: { id: { type: GraphQLID } },
			resolve: (parent, { id }) => Song.findById(id)
		},
		author: {
			type: AuthorType,
			args: { id: { type: GraphQLID } },
			resolve: (parent, { id }) => Author.findById(id)
		},
		authors: {
			type: GraphQLList(AuthorType),
			resolve: () => Author.find({})
		},
		songs: {
			type: GraphQLList(SongType),
			resolve: () => Song.find({})
		},
		album: {
			type: AlbumType,
			args: { id: { type: GraphQLID } },
			resolve: (parent, { id }) => Album.findById(id)
		},
		albums: {
			type: GraphQLList(AlbumType),
			resolve: () => Album.find({})
		}
	}
});

const RootMutation = new GraphQLObjectType({
	name: 'Mutation',
	fields: {
		addAuthor: {
			type: AuthorType,
			args: {
				name: { type: new GraphQLNonNull(GraphQLString) },
				age: { type: new GraphQLNonNull(GraphQLInt) },
				birthplace: { type: new GraphQLNonNull(GraphQLString) }
			},
			resolve: (parent, args) => {
				let author = new Author({
					name: args.name,
					age: args.age,
					birthplace: args.birthplace
				});
				return author.save();
			}
		},
		addSong: {
			type: SongType,
			args: {
				name: { type: new GraphQLNonNull(GraphQLString) },
				length: { type: new GraphQLNonNull(GraphQLString) },
				authorId: { type: new GraphQLNonNull(GraphQLID) },
				albumId: { type: new GraphQLNonNull(GraphQLID) }
			},
			resolve: (parent, args) => {
				let song = new Song({
					name: args.name,
					length: args.length,
					authorId: args.authorId,
					albumId: args.albumId
				});
				return song.save();
			}
		},
		addAlbum: {
			type: AlbumType,
			args: {
				name: { type: new GraphQLNonNull(GraphQLString) },
				genre: { type: new GraphQLNonNull(GraphQLString) },
				released: { type: new GraphQLNonNull(GraphQLString) },
				authorId: { type: new GraphQLNonNull(GraphQLID) }
			},
			resolve: (parent, args) => {
				let album = new Album({
					name: args.name,
					genre: args.genre,
					released: args.released,
					authorId: args.authorId
				});
				return album.save();
			}
		}
	}
});
module.exports = new GraphQLSchema({
	query: RootQuery,
	mutation: RootMutation
});
