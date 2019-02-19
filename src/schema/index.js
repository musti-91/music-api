const mongoose = require('mongoose');
const graphql = require('graphql');
const { GraphQLSchema } = graphql;

const RootMutation = require('./RootMutation');
const RootQuery = require('./RootQuery');

module.exports = new GraphQLSchema({
	query: RootQuery,
	mutation: RootMutation
});
