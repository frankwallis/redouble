var gulp = require('gulp');
var tasks = require('./tasks');

tasks
   .addClean(['jspm_packages/**', 'build/**', 'reports/**'])
   .addBundle({
       entryJs: "src/ui/app.jsx",
       outputJs: "build/build.js"
   })
   .addServer({
      port: 8888,
      verbose: true,
      baseURL: "/tower/"
   })
   .build(gulp);
