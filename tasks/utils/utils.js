var fs = require('fs');
var path = require('path');
var glob = require( 'glob' );

function ensureDirectory(filename, callback) {
   var dirname = path.dirname(filename);

   fs.exists(dirname, function (exists) {
      if (exists) return callback(null);

      var current = path.resolve(dirname);

      ensureDirectory(current, function (err) {
         if (err) return callback(err);

         fs.mkdir(current, 0766, function (err) {
            if (err) {
               // maybe it got created while we were faffing about
               fs.exists(current, function (exists) {
                  if (exists)
                  return callback();
                  else
                  return callback(err);
               });
            }
            else {
               callback();
            }
         });
      });
   });
}

function ensureWriteFile(filename, string, callback) {
   ensureDirectory(filename, function(err) {
      if (err) callback(err);
      else fs.writeFile(filename, string, callback);
   })
}

/**
* Resolves a gulp-like glob pattern,
* https://github.com/gulpjs/gulp/blob/master/docs/API.md#gulpsrcglobs-options,
* to a minimatch glob string, https://github.com/isaacs/minimatch
*
* @param {string|array} pattern - A glob or an array of globs
* @returns - An array of files matched by the glob
*/
function unglob(pattern, root) {
   if (Array.isArray(pattern)) {
      if (pattern.length === 1)
      pattern = pattern[0];
      else
      pattern = '{' + pattern.join(',') + '}';
   }

   root = root || process.cwd();
   return glob.sync(pattern, { "nosort": true, "cwd": root, "root": root });
};

function endsWith(str, post) {
   return str.lastIndexOf(post) + post.length === str.length;
}

function changeExtension(file, newext) {
   var ext = path.extname(file);
   return file.slice(0, file.length - ext.length) + '.' + newext;
}

module.exports.changeExtension = changeExtension;
module.exports.ensureDirectory = ensureDirectory;
module.exports.ensureWriteFile = ensureWriteFile;
module.exports.unglob = unglob;
module.exports.endsWith = endsWith;
