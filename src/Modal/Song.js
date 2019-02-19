const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const SongSchema = new Schema({
	name: String,
	length: String,
	genre: String,
	year: String,
	description: String,
	// linked
	authorId: String,
	albumId: String
});

module.exports = mongoose.model('Song', SongSchema);
