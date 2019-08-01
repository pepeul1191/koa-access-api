const homeRouter = require('../routes/home');
const errorRouter = require('../routes/error');
const loginRouter = require('../routes/login');
const adminRouter = require('../routes/admin');
const userRouter = require('../routes/user');
const stateRouter = require('../routes/state');
const systemRouter = require('../routes/system');
const permissionRouter = require('../routes/permission');

var register = function(app){
  app.use(homeRouter.routes);
  app.use(errorRouter.routes);
  app.use(loginRouter.routes);
  app.use(adminRouter.routes);
  app.use(userRouter.routes);
  app.use(stateRouter.routes);
  app.use(systemRouter.routes);
  app.use(permissionRouter.routes);
}

exports.register = register;