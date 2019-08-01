const homeRouter = require('../api/controllers/home_controller');
const studentRouter = require('../api/controllers/student_controller');

module.exports = function(app){
  app.use(homeRouter.routes);
  app.use(studentRouter.routes);
};