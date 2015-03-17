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
   app.use(express.static(options.webRoot));

   function index(req, res) {
      res.sendFile('index.html', {'root': options.webRoot});
   };

   // serve index
   app.get('/', index);

   // redirect all other *routes* to the index, angular will take care of the rest
   // if the route is a filepath (has a file extension) then let it through to 404
   app.get('*', function(req, res, next) {
      var route = req.path;

      // strip query params from end
      route = route.split('?')[0];

      // strip directories from front
      route = route.slice(route.lastIndexOf('/') + 1);

      if (route.indexOf(".") < 0)
         return index(req, res);
         else
         return next();
   });
   //app.get(/^([^.]+)$/, index);?

   var server = http.createServer(app).listen(options.port, function () {
      console.log('express server listening on port ' + options.port);
   });
}

module.exports = staticServer;
