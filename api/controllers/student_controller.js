const Router = require('koa-trie-router');
const middlewares = require('../../config/middlewares');
const Student = require('../models/student');

let router = new Router();

router.get('/student/list', [
  async (ctx, next) => {
    // init data
    ctx.status = 200;
    var lang = middlewares.getLanguage(ctx);
    // get students
    var students = await Student.findAll({});
    // response
    ctx.set('Content-Type', 'text/html');
    ctx.body = JSON.stringify(students);
  }
]);

exports.routes = router.middleware();
