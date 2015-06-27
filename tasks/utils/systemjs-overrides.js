module.exports = function(System) {
   /* So we don't have to put '!' characters in our html imports */
   /* This won't be needed once SystemJs enables registering plugins
      for extensions in the next version */
   var systemNormalize = System.normalize;
   System.normalize = function(arg1, arg2) {
      return systemNormalize.call(this, arg1, arg2)
         .then(function(normed) {
            if ((normed.slice(-4) == '.css') && (normed.indexOf('app.') < 0)) {
               normed = normed + '!github:systemjs/plugin-css@0.1.9';
            }
            return normed;
         });
   }
}
