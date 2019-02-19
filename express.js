import express from 'express';
import GraphQLHttp from 'express-graphql';
import mongoose from 'mongoose';
import cors from 'cors';
import helmet from 'helmet';
import RootSchema from './src/schema';

const PORT = process.env.PORT || 3030;
const app = express();

require('dotenv').config();
const { username, password } = process.env;

mongoose.connect(`mongodb://${username}:${password}@ds139775.mlab.com:39775/gql-music`, {
	useNewUrlParser: true
});

mongoose.connection.once('open', () => {
	console.log('connected to database');
});

app.use(cors());
app.use(helmet());

app.use(
	'/graphql',
	GraphQLHttp({
		schema: RootSchema,
		graphiql: true
	})
);
app.get('/', (req, res) => {
	res.send('navigate to /graphql for database');
});

app.get('/graphql', (req, res) => {
	res.send();
});

app.listen(PORT, () => {
	console.log(`start listening to port: ${PORT} ${app.get('env')}`);
});
