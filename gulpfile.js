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