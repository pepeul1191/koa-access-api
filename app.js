const Koa = require('koa');
const static = require('koa-static');
// export configs
// const sockets = require('./config/sockets');
// const middlewares = require('./config/middlewares');
// const constants = require('./config/constants');
const bootstrap = require('./config/bootstrap');
// new app
const app = new Koa();
// static files
app.use(static(__dirname + '/public'));
// forward routes
bootstrap(app);
// port
app.listen(3000);