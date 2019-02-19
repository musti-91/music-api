const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const AuthorSchema = new Schema({
	name: String,
	age: Number,
	birthPlace: String,
	// linked
	albumId: String
});

module.exports = mongoose.model('Author', AuthorSchema);
