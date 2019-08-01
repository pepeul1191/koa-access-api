const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const db = mongoose.connect('mongodb://localhost:27017/access');

module.exports = {
	db: db,
	Schema: Schema,
	mongoose: mongoose,
};
