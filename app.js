const Koa = require('koa');
const static = require('koa-static');
const koaBody = require('koa-body');
// export configs
const middlewares = require('./config/middlewares');
const bootstrap = require('./config/bootstrap');
const constants = require('./config/constants');
// new app
const app = new Koa();
app.keys = ['rnbfpzfuywmiwtfrrlomwlzlhdxfxjnfifzvkrloobswyoifkt'];
app.use(koaBody(constants.body));
// static files
app.use(static(__dirname + '/public'));
// middlewares
app.use(middlewares.preResponse());
app.use(middlewares.showLogs());
// error 500 handler
app.use(middlewares.internalErrorHandler);
// forward routes
bootstrap(app);
// error 404 handler
app.use(middlewares.errorNotFoundHandler);
// port
app.listen(3000);
