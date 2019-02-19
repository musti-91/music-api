const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const AlbumSchema = new Schema({
	name: String,
	year: String,
	// linked
	songId: String,
	authorId: String
});
module.exports = mongoose.model('Album', AlbumSchema);
