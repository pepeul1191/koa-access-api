const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const db = mongoose.connect('mongodb://localhost:27017/chat_db');

module.exports = {
	db: db,
	Schema: Schema,
	mongoose: mongoose,
};
