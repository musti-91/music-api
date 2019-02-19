const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const AlbumSchema = new Schema({
	name: String,
	genre: String,
	released: String,
	authorId: String
});

module.exports = mongoose.model('Album', AlbumSchema);
