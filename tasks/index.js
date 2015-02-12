var builders = [];

module.exports.build = function(gulp) {

    builders.forEach(function(builder) {
        builder(gulp);
    });

    return module.exports; // fluent
}

module.exports.addInstall = function(options) {
    var install = require('./install/install-builder');
    builders.push(install(options));
    return module.exports;
}

module.exports.addBundle = function(options) {
    var bundle = require('./bundle/bundle-builder');
    builders.push(bundle(options));
    return module.exports;
}

module.exports.addSpecs = function(options) {
    var specs = require('./specs/specs-builder');
    builders.push(specs(options));
    return module.exports;
}

module.exports.addClean = function(options) {
    var clean = require('./clean/clean-builder');
    builders.push(clean(options));
    return module.exports;
}

module.exports.addServer = function(options) {
    var server = require('./server/server-builder');
    builders.push(server(options));
    return module.exports;
}
