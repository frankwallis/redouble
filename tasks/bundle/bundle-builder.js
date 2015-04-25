var fs = require('fs');
var path = require('path');
var del = require('del');
var gutil = require('gulp-util');
var utils = require('../utils/utils');
var notify = require('../utils/notify');
var mkdirp = require('mkdirp');
var Builder = require('systemjs-builder');
var overrideSystemJS = require("../utils/systemjs-overrides");

module.exports = function(options) {

   options = options || {};
   options.entryJs = options.entryJs || 'src/index.js';
   options.outputJs = options.outputJs || 'build/build.js';
   options.outputCss = utils.changeExtension(options.outputJs, 'css');
   options.config = options.config || 'config.js';

   return function(gulp) {
      gulp.task('clean-bundles', function(cb) {
         del([ options.outputJs, options.outputCss ], function (err) {
            gutil.log("Deleted " + options.outputJs + ", " + options.outputCss);
            mkdirp(path.dirname(options.outputJs));
            cb(err);
         });
      });

      gulp.task('bundle', ['clean-bundles'], function (cb) {
         if (options.entryJs.slice(-4) == '.jsx')
            options.entryJs = options.entryJs + '!';

         var builder = new Builder();
         builder.loadConfig(options.config)
            .then(function() {
               overrideSystemJS(builder.loader);
               builder.config({
                  buildCSS: true,
                  separateCSS: true,
                  rootURL: "/tower/"
               });
               return builder.buildSFX(options.entryJs, options.outputJs);
            })
            .then(function() {
               gutil.log("Output " + options.outputJs + ", " + options.outputCss);
               cb();
            })
            .catch(function(err) {
               gutil.log('Build error:');
               gutil.log(err);
               cb(err);
            });
      });

      var watchOpts =  {
         read: false,
         debounceDelay: 1000,
         interval: 500
      };

      gulp.task('watch', [ 'bundle' ], function () {
         gulp.watch(["src/**/*"], watchOpts, [ 'bundle' ]);
      });

      gulp.task('default', ['bundle']);
   }
}
