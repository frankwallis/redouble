// webpack will take care of not sending the server code to the browser
let api = process.env.__BROWSER__ ? require("./client") : require("./server");
module.exports = api;
