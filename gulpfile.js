var gulp = require('gulp');
var tasks = require('./tasks');

tasks
   .addClean(['jspm_packages/**', 'build/**', 'reports/**'])
   .addBundle({
      /* main entry point and web-worker entry point */
      entryJs: "src/ui/app.jsx + src/model/strategy/cardplay/mcts-strategy",
      outputJs: "build/build.js",
      minify: true
   })
   .addServer({
      port: 8888,
      verbose: true,
      baseURL: "/tower/",
      webIndex: "index-dev.html"
   })
   .build(gulp);
