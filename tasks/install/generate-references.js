var os = require('os');
var path = require('path');
var resolveList = require('component-resolve-list');

module.exports = function(options, done) {
    options = options || {};
    options.filterRx = /\.d\.ts$/i;
    options.development = true;
    options.root = options.root || process.cwd();

    resolveList.custom(options, function(filelist, err) {
        if (err) throw err;

        var header = os.EOL;
        header    += "/// ------------------------------------- ///" + os.EOL;
        header    += "/// Automatically generated. DO NOT EDIT. ///" + os.EOL;
        header    += "/// ------------------------------------- ///" + os.EOL + os.EOL;

        var lines = filelist
            .reduce(function(lines, file) {

                if (path.basename(file) != '_references.d.ts') {
                    lines += '/// <reference path="';
                    lines += forward_slash( path.relative(options.root, file) );
                    lines += '" />' + os.EOL;
                }

                return lines;
            }, header);

        return done(lines);    
    });
}

function forward_slash(str) {
    return str.replace(/\\/g, '/');
}
