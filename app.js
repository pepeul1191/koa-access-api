const Koa = require('koa');
const static = require('koa-static');
// export configs
// const sockets = require('./config/sockets');
// const constants = require('./config/constants');
const middlewares = require('./config/middlewares');
const bootstrap = require('./config/bootstrap');
// new app
const app = new Koa();
// static files
app.use(static(__dirname + '/public'));
// middlewares
app.use(middlewares.preResponse());
app.use(middlewares.showLogs());
// forward routes
bootstrap(app);
// port
app.listen(3000);