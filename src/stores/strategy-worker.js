
/* Copied from SystemJS */
function getLocation() {
   var result = '';
   try {
     throw new Error('Get worker base path via error stack');
   } catch (e) {
     e.stack.replace(/(?:at|@).*(http.+):[\d]+:[\d]+/, function (m, url) {
       result = url.replace(/\/[^\/]*$/, '/');
     });
   }
   result = result.slice(0, result.indexOf("tower"));
   return result;
}

var location = getLocation();

/* Because this script is loaded as a blob, SystemJS tries to load files
   using a URL of 'blob:/tower/src/'...
   Workaround that by replacing with the proper location.
*/
var systemLocate = System.locate;
System.locate = function(load) {
   var System = this; // its good to ensure exact instance-binding
   return systemLocate.call(this, load)
      .then(function(address) {
         return location + address.slice(address.indexOf("tower"));
      });					
}

System.config({
   "baseURL": "/tower/"
})

/* used in strategy-proxy, global is to get around CORS restriction loading from blob url */
this.instance = System.import("src/model/strategy/cardplay/mcts-strategy")
   .then(function(mod) { return new mod.CardplayStrategy(); });
