var yaml = require('js-yaml');
var fs   = require('fs');
const path = require('path');

var get = function(file){
  var file_route = path.join(__dirname, '../contents', file + '_content.yml');
  return yaml.safeLoad(fs.readFileSync(file_route), 'utf8');
}

var titles = function(){
  var file_route = path.join(__dirname, '../contents', '_titles.yml');
  return yaml.safeLoad(fs.readFileSync(file_route), 'utf8');
}

exports.get = get;
exports.titles = titles;