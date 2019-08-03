const homeRouter = require('../api/controllers/home_controller');
const userRouter = require('../api/controllers/user_controller');
const userCheckRouter = require('../api/controllers/user_check_controller');

module.exports = function(app){
  app.use(homeRouter.routes);
  app.use(userRouter.routes);
  app.use(userCheckRouter.routes);
};
