module.exports = function(options) {

   var path = require('path');

   options = options || {};
   options.webRoot = path.join(process.cwd(), options.webRoot || '');
   options.baseURL = options.baseURL || '';
   options.webIndex = options.webIndex || "index.html";
   options.port = options.port || 8888;
   options.liveReload = options.liveReload || true;
   options.liveReloadDelay = options.liveReloadDelay || 1200;
   options.launchBrowser = options.launchBrowser || true;
   options.verbose = options.verbose || false;

   return function(gulp) {
      gulp.task('serve', function (cb) {
         var staticServer = require("./static-server");
         staticServer(options);

         if (options.liveReload) {
            var liveReload = require("./live-reload");
            liveReload(options);
         }

         if (options.launchBrowser) {
            var launchBrowser = require("./launch-browser");
            launchBrowser(options);
         }
      });
   }
}
