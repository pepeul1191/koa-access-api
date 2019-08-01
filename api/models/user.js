/**
 * student.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https
 */

const db = require('../../config/database');
const UserSystem = require('./user_system');

module.exports = db.mongoose.model('users',
  new db.Schema({
    user:  String,
    pass: String,
    email: String,
    profile_picture: String,
    reset_key: String,
    activation_key: String,
    state_id:  db.Schema.Types.ObjectId,
    systems: [UserSystem],
  })
);
