var os = require('os');
var path = require('path');
var resolveList = require('component-resolve-list');

module.exports = function(tree, options, done) {
    options = options || {};
    options.tree = tree;
    options.canonical = true;

    resolveList.custom(options, function(filelist, err) {
        if (err) throw err;

        var header = os.EOL;
        header    += "/// ------------------------------------- ///" + os.EOL;
        header    += "/// Automatically generated. DO NOT EDIT. ///" + os.EOL;
        header    += "/// ------------------------------------- ///" + os.EOL + os.EOL;

        var content = filelist
            .reduce(function(current, file) {
                current += 'require("';
                current += forward_slash(file);
                current += '");' + os.EOL;

                return current;
            }, header);

        return done(content);    
    });
}

function forward_slash(str) {
    return str.replace(/\\/g, '/');
}
