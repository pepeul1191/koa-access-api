const Koa = require('koa');
const static = require('koa-static');
const render = require('koa-ejs');
const path = require('path');
// export configs
// const sockets = require('./config/sockets');
// const constants = require('./config/constants');
const middlewares = require('./config/middlewares');
const bootstrap = require('./config/bootstrap');
// new app
const app = new Koa();
app.keys = ['rnbfpzfuywmiwtfrrlomwlzlhdxfxjnfifzvkrloobswyoifkt'];
// static files
app.use(static(__dirname + '/public'));
// views EJS
render(app, {
  root: path.join(__dirname, 'views'),
  layout: false,
  viewExt: 'ejs',
  cache: false,
  debug: false
});
// middlewares
app.use(middlewares.preResponse());
app.use(middlewares.showLogs());
// forward routes
bootstrap(app);
// error 500 handler
app.use(middlewares.internalErrorHandler);
// error 404 handler
app.use(middlewares.errorNotFoundHandler);
// port
app.listen(3000);