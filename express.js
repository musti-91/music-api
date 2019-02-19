require('dotenv').config();
const express = require('express');
const GraphQLHttp = require('express-graphql');
const mongoose = require('mongoose');
const cors = require('cors');
const PORT = process.env.PORT || 3030;
const app = express();

const mainSchema = require('./src/schema');
const { username, password } = process.env;

mongoose.connect(`mongodb://${username}:${password}@ds139775.mlab.com:39775/gql-music`);

mongoose.connection.once('open', () => {
	console.log('connected to database');
});
app.use(cors());
app.use(
	'/graphql',
	GraphQLHttp({
		schema: mainSchema,
		graphiql: true
	})
);

app.listen(PORT, () => {
	console.log(`start listening to port: ${PORT}`);
});
