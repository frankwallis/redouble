var babel = require('babel');

module.exports = {
   process: function(src, filename) {
      // Ignore all files within node_modules
      // babel files can be .js, .es, .jsx or .es6
      if (filename.indexOf('node_modules') === -1 && babel.canCompile(filename)) {
         // return babel.transform(src, { optional: ["reactCompat"] }).code;
         return babel.transform(src, { filename: filename }).code;
      } else {
         return src;
      }
   }
};
