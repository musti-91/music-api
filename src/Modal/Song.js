const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const SongScheme = new Schema({
	name: String,
	length: String,
	authorId: String,
	albumId: String
});

module.exports = mongoose.model('Song', SongScheme);
