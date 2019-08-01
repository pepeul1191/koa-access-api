const Router = require('koa-trie-router');
const middlewares = require('../../config/middlewares');
const User = require('../models/user');
const userCheck = require('../helpers/user_check');
const getStatusId = require('../helpers/get_status_id');
const random = require('../helpers/random');
const db = require('../../config/database');

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
        {
          user: ctx.request.body.user
        },
        {
          email: ctx.request.body.email
        },
      ]
    }).exec();
    if(temp != null){
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
        state_id: getStatusId('activation_pending'),
        activation_key: random(24),
        reset_key: random(24),
        systems: [{
          system_id: db.mongoose.Types.ObjectId(ctx.request.body.system_id),
          permissions_id: [],
        }],
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

router.post('/user/check/activate', [
  //middlewares.sessionRequiredFalse,
  async (ctx, next) => {
    var resp = {};
    var status = 200;
    // get user with user and email
    var temp = await User.findOne({
      $and: [
        {
          _id: ctx.request.body._id
        },
        {
          activation_key: ctx.request.body.activation_key
        },
      ]
    }).exec();
    if(temp == null){
      // error, neither activation_key nor _id not exist
      status = 409;
      resp.action_executed = 'none';
      resp.data = 'Código de activación errado';
    }else{
      // update user state and change reset_key
      await User.findOneAndUpdate(
        {
          _id: ctx.request.body._id
        },
        {
          $set: {
            state_id: getStatusId('active'),
            activation_key: random(24),
          }
        }
      );
      resp.action_executed = 'activated';
    }
    // response
    ctx.set('Content-Type', 'text/html; charset=utf-8');
    ctx.status = status;
    ctx.body = JSON.stringify(resp);
  }
]);

router.post('/user/check/reset', [
  //middlewares.sessionRequiredFalse,
  async (ctx, next) => {
    var resp = {};
    var status = 200;
    // get user with user and email
    var temp = await User.findOne({
      $and: [
        {
          _id: ctx.request.body._id
        },
        {
          reset_key: ctx.request.body.reset_key
        },
      ]
    }).exec();
    if(temp == null){
      // error, neither reset_key nor _id not exist
      status = 409;
      resp.action_executed = 'none';
      resp.data = 'Código de cambio de contraseña errado';
    }else{
      // update user state and change reset_key
      await User.findOneAndUpdate(
        {
          _id: ctx.request.body._id
        },
        {
          $set: {
            pass: ctx.request.body.pass,
            reset_key: random(24),
          }
        }
      );
      resp.action_executed = 'updated';
    }
    // response
    ctx.set('Content-Type', 'text/html; charset=utf-8');
    ctx.status = status;
    ctx.body = JSON.stringify(resp);
  }
]);

router.post('/user/reset', [
  //middlewares.sessionRequiredFalse,
  async (ctx, next) => {
    var resp = {};
    var status = 200;
    // get user with user and email
    var temp = await User.findOne({
      $and: [
        {
          email: ctx.request.body.email
        },
      ]
    }).exec();
    if(temp == null){
      // error, neither reset_key nor _id not exist
      status = 409;
      resp.action_executed = 'none';
      resp.data = 'Correo no registrado';
    }else{
      // update user state and change reset_key
      var temp = await User.findOneAndUpdate(
        {
          email: ctx.request.body.email
        },
        {
          $set: {
            reset_key: random(24),
          }
        }
      );
      resp.action_executed = 'updated';
      resp.reset_key = temp.reset_key;
      resp._id = temp._id;
    }
    // response
    ctx.set('Content-Type', 'text/html; charset=utf-8');
    ctx.status = status;
    ctx.body = JSON.stringify(resp);
  }
]);

exports.routes = router.middleware();
