var gulp = require('gulp');
var tasks = require('./tasks');

tasks
   .addClean(['jspm_packages/**', 'reports/**'])
   .addInstall({
      rootDir: "src"
   })
   // .addBundle({
   //     entryJs: "src/index.ts",
   //     entryCss: "src/ui/index.css"
   // })
   .addServer({
      port: 8888,
      verbose: true
   })
   .build(gulp);
