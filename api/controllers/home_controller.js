const Router = require('koa-trie-router');
var middlewares = require('../../config/middlewares');

let router = new Router();

router.get('/', [
  async (ctx, next) => {
    ctx.status = 200;
    var lang = middlewares.getLanguage(ctx);
    ctx.set('Content-Type', 'text/html');
    ctx.body = 'hola mundo';
  }
]);

router.get('/xd', [
  async (ctx, next) => {
    ctx.set('Content-Type', 'text/html');
    ctx.body = 'xd';
  }
]);

exports.routes = router.middleware();
