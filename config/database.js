const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const db = mongoose.connect('mongodb://localhost:27017/chat_db');

exports.db = db;
exports.Schema = Schema;
exports.mongoose = mongoose;
