var open = require('open');

function launchBrowser(options) {
   open("http://localhost:" + options.port);
}

module.exports = launchBrowser;
