const Router = require('koa-trie-router');
const middlewares = require('../../config/middlewares');
const User = require('../models/user');
const userCheck = require('../helpers/user_check');
const random = require('../helpers/random');

let router = new Router();

router.post('/user/check', [
  //middlewares.sessionRequiredFalse,
  async (ctx, next) => {
    var resp = '';
    var status = 200;
    // get count users with user and pass
    var user = await userCheck(
      ctx.request.body.user,
      ctx.request.body.pass
    );
    if(user.length == 0){
      status = 409;
    }else{
      // get status
      resp = user[0].state;
    }
    // response
    ctx.set('Content-Type', 'text/html; charset=utf-8');
    ctx.status = status;
    ctx.body = resp;
  }
]);

router.post('/user/create', [
  //middlewares.sessionRequiredFalse,
  async (ctx, next) => {
    var resp = {};
    var status = 200;
    // get user with user and email
    var temp = await User.findOne({
      $or: [
        {user: ctx.request.body.user},
        {email: ctx.request.body.email},
      ]
    }).exec();
    if(temp){
      // error, neither user nor email are unique
      status = 409;
      resp.action_executed = 'none';
      resp.data = 'Usuario y/o correo repetidos';
    }else{
      // create user
      var user = new User({
        user: ctx.request.body.user,
        pass: ctx.request.body.pass,
        email: ctx.request.body.email,
        profile_picture: 'default_user.png',
        state_id: '5d3a08bf0f10e27b34624873', // activation pending
        activation_key: random(16),
        reset_key: random(16),
        systems: [],
      });
      var new_user = await user.save();
      resp.action_executed = 'create';
      resp._id = new_user._id;
      resp.activation_key = new_user.activation_key;
    }
    // response
    ctx.set('Content-Type', 'text/html; charset=utf-8');
    ctx.status = status;
    ctx.body = JSON.stringify(resp);
  }
]);

exports.routes = router.middleware();
