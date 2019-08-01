const Koa = require('koa');

// export configs
// const sockets = require('./config/sockets');
// const middlewares = require('./config/middlewares');
// const constants = require('./config/constants');
const bootstrap = require('./config/bootstrap');
// new app
const app = new Koa();
// forward routes
bootstrap(app);
// port
app.listen(3000);