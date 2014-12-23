var gulp = require('gulp');
var tasks = require('gulp-tasks');

tasks
    .addClean({})
    .addInstall({
        typescriptDirs: ["src"]
    })
    .addSpecs({ 
        remoteSpecs: true
    })
    .addBundle({ 
    	
    })
    .addE2eTests({ 
    	baseUrl: "http://localhost:8888",
    	seleniumAddress: 'standalone',
        remoteTests: true
    })
    .addServer({ 
    	port: 8888, 
    	verbose: true
    })
    .build(gulp);

gulp.task('duo', function(cb) {
    var Duo = require("duo");
    var fs = require('fs');
    var typescript = require('../duo-typescript');
    var duo = new Duo(process.cwd())
    duo
      .entry('src/index.ts')
      .use(typescript())
//      .write();
      .run(function(err, src) {
            if (err) {
               // notify.error(err);
                //gutil.log(gutil.colors.red(err));
                console.log(err);
                cb();
            }
            else {
                // add the global require
               // string = builder.scripts.require + string;

                // automatically require the entry point
                //string = string + 'require("' + builder.scripts.canonical(tree).canonical + '");\n';

                // fix up the source maps
                //string = fixMaps(string);
                
                var filename = 'build/build.js';
                fs.writeFile(filename, src, function(err) {
                    if (err) throw err;
                    gutil.log('Generated ' + filename);
                    cb();
                });
            }
        });

      //       console.log(err);
      //       console.log(src);
      //      });

    function strungify(a) {
        for (var prop in a)
            console.log(prop + ': ' + a[prop]);
    }
    
//    function typescript(file, entry) {
//        
//        console.log(strungify(file));
//        console.log(strungify(entry));
//        
//      // ensure the file is a coffeescript file
//      if ('ts' != file.type) return;
//
//        
//      // ensure we're building a javascript file
//      if ('js' != entry.type) return;
//
//      // compile the coffeescript
//     // file.src = coffee.compile(file.src);
//
//      // update the file type
//      file.type = 'js';
//    }
});