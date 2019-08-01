const Router = require('koa-trie-router');
var constants = require('../../config/constants');
var helpers = require('../../config/helpers');
var contents = require('../../config/contents');
var middlewares = require('../../config/middlewares');
var errorHelper = require('../helpers/error_helper');

let router = new Router();

router.get('/error/access/:num', [
  async (ctx, next) => {
    ctx.status = 404;
    var lang = middlewares.getLanguage(ctx);
    var error_number = ctx.params.num;
    var registered_errors = ['404', '5051'];
    // check if error content is not registered then, default error 404
    if (registered_errors.indexOf(error_number) == -1){
      error_number = '404';
    }
    var locals = {
      constants: constants.data,
      title: contents.titles()[lang]['error'],
      helpers: helpers,
      csss: errorHelper.accessCss(),
      jss: errorHelper.accessJs(),
      contents: contents.get('error')[lang][error_number],
      lang: lang,
    };
    await ctx.render('error/access', locals);
  }
]);

exports.routes = router.middleware();
