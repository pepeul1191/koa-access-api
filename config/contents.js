var yaml = require('js-yaml');
var fs   = require('fs');
const path = require('path');

var get = function(file){
  var file_route = path.join(__dirname, '../api/contents', file + '_content.yml');
  return yaml.safeLoad(fs.readFileSync(file_route), 'utf8');
}

exports.get = get;
