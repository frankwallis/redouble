var gulp = require('gulp');
var tasks = require('./tasks');

tasks
    .addClean(['build/**/*', 'components/**', 'reports/**'])
    .addInstall({
        rootDir: "src"
    })
    .addSpecs({ 
        
    })
    .addBundle({ 
        entryJs: "src/index.ts",
        entryCss: "src/ui/index.css"
    })
    .addServer({ 
    	port: 8888, 
    	verbose: true
    })
    .build(gulp);
