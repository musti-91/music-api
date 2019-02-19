const mongoose = require('mongoose');
const graphql = require('graphql');
const { GraphQLObjectType, GraphQLID, GraphQLString, GraphQLList } = graphql;
const Author = require('../Modal/Author');
const Album = require('../Modal/Album');
const Song = require('../Modal/Song');

const SongType = new GraphQLObjectType({
	name: 'SongType',
	fields: () => ({
		id: { type: GraphQLID },
		name: { type: GraphQLString },
		length: { type: GraphQLString },
		genre: { type: GraphQLString },
		year: { type: GraphQLString },
		author: {
			type: AuthorType,
			resolve: (parent, args) => Author.findById(parent.authorId)
		}
	})
});

const AuthorType = new GraphQLObjectType({
	name: 'AuthorType',
	fields: () => ({
		id: { type: GraphQLID },
		name: { type: GraphQLString },
		birthplace: { type: GraphQLString },
		albums: {
			type: GraphQLList(AlbumType),
			resolve: (parent, args) => Album.find({ authorId: parent.id })
		}
	})
});
const AlbumType = GraphQLObjectType({
	name: 'AlbumType',
	fields: () => ({
		id: { type: GraphQLID },
		name: { type: GraphQLString },
		year: { type: GraphQLString },
		authorId: { type: AuthorType, resolve: () => Author.findById(parent.id) },
		songs: {
			type: GraphQLList(SongType),
			resolve: (parent, args) => Song.find({ authorId: parent.authorId })
		}
	})
});
module.exports = {
	SongType,
	AuthorType,
	AlbumType
};
