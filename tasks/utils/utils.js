var fs = require('fs');
var path = require('path');

function ensureDirectory(filename, callback) {
    var dirname = path.dirname(filename);

    fs.exists(dirname, function (exists) {
        if (exists) return callback(null);

        var current = path.resolve(dirname);

        ensureDirectory(current, function (err) {
            if (err) return callback(err);
            
            fs.mkdir(current, 0766, function (err) {
                if (err) {
                    // maybe it got created while we were faffing about
                    fs.exists(current, function (exists) {
                        if (exists)
                            return callback();                            
                        else
                            return callback(err);
                    });
                }
                else {
                    callback();
                }
            });
        });
    });
}

function ensureWriteFile(filename, string, callback) {
    ensureDirectory(filename, function(err) {
        if (err) callback(err);
        else fs.writeFile(filename, string, callback);
    })
}

function endsWith(str, post) {
    return str.lastIndexOf(post) + post.length === str.length;
}

module.exports.ensureDirectory = ensureDirectory;
module.exports.ensureWriteFile = ensureWriteFile;
module.exports.endsWith = endsWith;