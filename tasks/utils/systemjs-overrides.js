module.exports = function(System) {
   /* Workaround for https:z//github.com/systemjs/systemjs/issues/319 */
   var systemLocate = System.locate;
   System.locate = function(load) {
      var System = this; // its good to ensure exact instance-binding
      return systemLocate.call(this, load).then(function(address) {
         if (address.slice(-7) == '.jsx.js')
            address = address.slice(0, address.length -3);

         return address;
      });
   }

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
            if ((normed.slice(-4) == '.jsx') && (normed.indexOf('app.') < 0)) {
               normed = normed + '!github:floatdrop/plugin-jsx@0.1.1';
            }
            return normed;
         });
   }
}
