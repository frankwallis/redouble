var os = require('os');
var path = require('path');
var utils = require('../utils/utils');

module.exports = function(options) {
   options = options || {};
   options.root = options.root || process.cwd();
   options.rootDir = options.rootDir || options.root;

   var filelist = utils.unglob(['components/**/*.d.ts', path.join(options.rootDir, '**/*.d.ts')], options.root);

   var result = "";
   result    += "/// ------------------------------------- ///" + os.EOL;
   result    += "/// Automatically generated. DO NOT EDIT. ///" + os.EOL;
   result    += "/// ------------------------------------- ///" + os.EOL + os.EOL;

   filelist.forEach(function(filename, idx) {
      if (path.basename(filename) != '_references.d.ts') {
         result += '/// <reference path="';
         result += forward_slash( path.relative(options.rootDir, filename) );
         result += '" />' + os.EOL;
      }
   })

   return result;
}

function forward_slash(str) {
   return str.replace(/\\/g, '/');
}
