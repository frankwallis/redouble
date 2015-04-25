var http = require('http');
var express = require('express');

function staticServer(options) {

   var app = express();

   // log all requests
   if (options.verbose) {
      var morgan = require("morgan");
      app.use(morgan("combined"));
   }

   // this injects the live reload script into index.html
   if (options.liveReload) {
      var lr_rewriter = require("connect-livereload-safe");
      var liveReloadPort = options.liveReloadPort || 35729;
      var liveReloadHost = "http://localhost:" + liveReloadPort;
      app.use(lr_rewriter({
         host: liveReloadHost
      }));
      console.log('livereload client injected for host ' + liveReloadHost);
   }

   // serve the static assets
   app.use(options.baseURL, express.static(options.webRoot));

   function index(req, res) {
      res.sendFile(options.webIndex, {'root': options.webRoot});
   };

   // serve index
   app.get('/', index);

   // redirect all other routes without file extensions to the index
   app.get(/^([^.]+)$/, index);

   var server = http.createServer(app).listen(options.port, function () {
      console.log('express server listening on port ' + options.port);
   });
}

module.exports = staticServer;
