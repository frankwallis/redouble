module.exports = function(options) {
    
    var path = require('path');
    
    options = options || {};
    options.liveReload = options.liveReload || true;
    options.launchBrowser = options.launchBrowser || true;
    options.webRoot = path.join(process.cwd(), options.webRoot || '');
    options.bridgeAddress = options.bridgeAddress || 'http://172.30.30.252:8888';
    options.port = options.port || 8888;
    options.liveReloadDelay = options.liveReloadDelay || 1200;
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