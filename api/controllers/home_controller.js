const Router = require('koa-trie-router');

let router = new Router();

router.get('/', [
  async (ctx, next) => {
    ctx.status = 200;
    ctx.set('Content-Type', 'text/html');
    ctx.body = 'ok';
  }
]);

exports.routes = router.middleware();
