const Router = require('koa-trie-router');
// const middlewares = require('../../config/middlewares');
const User = require('../models/user');
const userCheck = require('../helpers/user_check');
const getStatusId = require('../helpers/get_status_id');
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

exports.routes = router.middleware();
