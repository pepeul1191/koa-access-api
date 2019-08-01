var db = require('./database');

// access's models

var UserSystem = new db.Schema({
  system_id: db.Schema.Types.ObjectId,
  permissions_id: [db.Schema.Types.ObjectId],
});

var User = db.mongoose.model('users',
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

var State = db.mongoose.model('states',
  new db.Schema({
    name:  String,
  })
);

var Log = db.mongoose.model('logs',
  new db.Schema({
    user_id:  db.Schema.Types.ObjectId,
    time:  db.Schema.Types.Date,
    action:  String,
    detail:  String,
  })
);

var Permission = db.mongoose.model('permission',
  new db.Schema({
    name: String,
    key: String, 
  })
);

var System = db.mongoose.model('systems',
  new db.Schema({
    name: String,
    permissions_id: [db.Schema.Types.ObjectId],
  })
);

var Menu = db.mongoose.model('menus',
  new db.Schema({
    name: String,
    url: String,
    type: String,
    parent_id: [db.Schema.Types.ObjectId],
  })
);

exports.User = User;
exports.State = State;
exports.Log = Log;
exports.Permission = Permission;
exports.System = System;
exports.UserSystem = UserSystem;
exports.Menu = Menu;