var path = require('path');
var gulp = require('gulp');
var tinylr = require('tiny-lr');
var debounce = require('debounce');

function liveReload(options) {
    // start a live reload server
    var server = tinylr();
    var liveReloadPort = options.liveReloadPort || 35729;

    server.listen(liveReloadPort, function() {
        console.log('livereload server listening on port ' + liveReloadPort);
    })

    // batch up changed files to minimise reloads
    var filelist = [];

    function performReload() {
        var msg = { body: { files: filelist } };
        server.changed(msg);
        filelist = [];
        console.log("triggered live-reload");    
    }

    var triggerReload = debounce(performReload, options.liveReloadDelay);

    var watchOpts =  { 
        read: false, 
        debounceDelay: 1000, 
        interval: 500,
        cwd: options.webRoot
    };

    gulp.watch([ "build/**/*.css", "build/**/*.js" ], watchOpts, function(evt) {
        if (evt.type != 'deleted') {
            filelist.push(path.relative(options.webRoot, evt.path));
            triggerReload();
        }
    });
}

module.exports = liveReload;