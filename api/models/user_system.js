/**
 * user_system.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https
 */

const db = require('../../config/database');

module.exports = new db.Schema({
  system_id: db.Schema.Types.ObjectId,
  permissions_id: [db.Schema.Types.ObjectId],
});
