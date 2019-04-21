// webpack will take care of not sending the server code to the browser
module.exports = process.env.__BROWSER__ ?
  require("./client").default:
  require("./server").default;