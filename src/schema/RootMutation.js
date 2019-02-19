// @ts-check
const Author = require('../Modal/Author');
const Song = require('../Modal/Song');
const Album = require('../Modal/Album');
const { AuthorType, SongType } = require('./types');

const graphql = require('graphql');

const { GraphQLNonNull, GraphQLObjectType, GraphQLString, GraphQLID } = graphql;

const RootMutation = new GraphQLObjectType({
	name: 'mutation',
	fields: {
		addAuthor: {
			type: AuthorType,
			args: {
				name: { type: new GraphQLNonNull(GraphQLString) }
			},
			resolve: (parent, args) => {
				let author = new Author({
					name: args.name
				});
				return author.save();
			}
		},
		addSong: {
			type: SongType,
			args: {
				name: { type: new GraphQLNonNull(GraphQLString) },
				authorId: { type: new GraphQLNonNull(GraphQLID) },
				year: { type: new GraphQLNonNull(GraphQLString) },
				albumId: { type: new GraphQLNonNull(GraphQLID) },
				genre: { type: new GraphQLNonNull(GraphQLString) }
			},
			resolve: (parent, { name, authorId, year, albumId, genre }) => {
				let song = new Song({
					name: name,
					authorId: authorId,
					year: year,
					albumId: albumId,
					genre: genre
				});
				return song.save();
			}
		}
	}
});
module.exports = RootMutation;
