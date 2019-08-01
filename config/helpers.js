const constants = require('./constants');

var loadCss = function(csss) {
  var rpta = '';
  if (typeof csss != 'undefined'){
    for(var i = 0; i < csss.length; i++){
      rpta = rpta + '<link rel="stylesheet" type="text/css" href="'+ constants.data.static_url + csss[i] + '.css" />'
    }
  }
  return rpta;
}

var loadJs = function(jss) {
  var rpta = '';
  if (typeof jss != 'undefined'){
    for(var i = 0; i < jss.length; i++){
      rpta = rpta + '<script src="' + constants.data.static_url + jss[i] + '.js"></script>'
    }
  }
  return rpta;
}

var random = function(length){
  var result = '';
  var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  var charactersLength = characters.length;
  for ( var i = 0; i < length; i++ ) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}

exports.loadCss = loadCss;
exports.loadJs = loadJs;
exports.random = random;