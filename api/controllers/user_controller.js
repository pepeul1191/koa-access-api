const Router = require('koa-trie-router');
const middlewares = require('../../config/middlewares');
const userCheck = require('../helpers/user_check');

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

exports.routes = router.middleware();
