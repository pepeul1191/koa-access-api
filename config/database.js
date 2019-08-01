const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const db = mongoose.connect('mongodb://localhost:27017/access', {
	//'useFindAndModify': false,
});

module.exports = {
	db: db,
	Schema: Schema,
	mongoose: mongoose,
};
