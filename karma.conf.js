module.exports = function (config) {
    config.set({
        basePath: './',
        autoWatch: false,
        
        files: [
            "build/build-specs.js"
        ],
        
        frameworks: ['jasmine'],
        browsers: ['PhantomJS']
    });
};
