var constants = require('./constants');
var contents = require('./contents');

// app middlewares

var preResponse = function(){
  return async (ctx, next) => {
    ctx.set('Server', 'Ubuntu');
    ctx.set('X-Powered-By', 'Node.js, ^koa$');
    await next();
  }
}

var showLogs = function(){
  if (constants.middlewares.logs){
    return async (ctx, next) => {
      await next();
      const rt = ctx.response.get('X-Response-Time');
      console.log(`${ctx.method} ${ctx.status} ${ctx.url} - ${rt}`);
    }
  } else{
    return async (ctx, next) => {
      await next();
    };
  }
}

var getLanguage = function(ctx){
  return 'sp';
}

var errorNotFoundHandler = async function (ctx, next){
  var lang = getLanguage(ctx);
  try {
    await next();
    const status = ctx.status || 404;
    if (status === 404) {
      ctx.throw(404);
    }
  } catch (err) {
    // console.log('ERRORR!!!!!!!!!!!!');
    ctx.status = err.status || 500;
    if (ctx.status === 404) {
      if (ctx.method == 'GET'){
        var static_extensions = ['css', 'js', 'png', 'jpg', ];
        var resource = `${ctx.method} ${ctx.status} ${ctx.url}`;
        resource = resource.split('.');
        if(static_extensions.indexOf(resource[resource.length - 1]) == -1){
          // await ctx.redirect('/error/access/404');
          ctx.set('Content-Type', 'text/html');
          ctx.status = 404;
          ctx.body = contents.get('error')[lang].error_handler.get_404;
        }
      }else{ 
        ctx.set('Content-Type', 'text/html');
        ctx.status = 404;
        ctx.body = contents.get('error')[lang].error_handler.post_404;
      }
    } else {
      await ctx.render('other_error');
    }
  }
}

var internalErrorHandler = async function (ctx, next){
  try {
    await next();
  } catch (err) {
    console.log(err);
    ctx.set('Content-Type', 'text/html');
    ctx.status = 500; //err.status || 500;
    ctx.body = err.stack;
  }
}

// action middlewares

// socket io middlewares

var preResponseSocket = async function (ctx, next){
  console.log('preResponseSocket middleware dice: ' + ctx.event);
  if(true){
    await next()
  }
}

exports.preResponse= preResponse;
exports.showLogs = showLogs;
exports.preResponseSocket = preResponseSocket;
exports.errorNotFoundHandler = errorNotFoundHandler;
exports.getLanguage = getLanguage;
exports.internalErrorHandler = internalErrorHandler;
