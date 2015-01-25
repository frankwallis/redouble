"use strict";
var __moduleName = "async-test1.js";
function timeout(ms) {
  return new Promise((function(resolve) {
    setTimeout(resolve, ms);
  }));
}
function asyncValue(value) {
  return $traceurRuntime.asyncWrap(function($ctx) {
    while (true)
      switch ($ctx.state) {
        case 0:
          Promise.resolve(timeout(50)).then($ctx.createCallback(2), $ctx.errback);
          return;
        case 2:
          $ctx.returnValue = value;
          $ctx.state = 4;
          break;
        case 4:
          $ctx.state = -2;
          break;
        default:
          return $ctx.end();
      }
  }, this);
}
Object.defineProperty(asyncValue, "parameters", {get: function() {
    return [[$traceurRuntime.type.string]];
  }});
(function() {
  var value;
  return $traceurRuntime.asyncWrap(function($ctx) {
    while (true)
      switch ($ctx.state) {
        case 0:
          Promise.resolve(asyncValue(42).catch(console.error.bind(console))).then($ctx.createCallback(3), $ctx.errback);
          return;
        case 3:
          value = $ctx.value;
          $ctx.state = 2;
          break;
        case 2:
          assert.equal(42, value);
          done();
          $ctx.state = -2;
          break;
        default:
          return $ctx.end();
      }
  }, this);
})();
