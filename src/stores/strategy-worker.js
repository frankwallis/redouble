var systemLocate = System.locate;
System.locate = function(load) {
   var System = this; // its good to ensure exact instance-binding
   return systemLocate.call(this, load).then(function(address) {
      if (address.slice(0, 5) == 'blob:') {
         address = address.slice(5, address.length);
			console.log('in locate ' + address);
		}
      //address = address.split("%3A").join(":");
		console.log('in locate ' + address);
      // TODO!
      return "http://localhost:8888" + address;
      //return address;
   });					
}

System.config({
   "baseURL": "/tower/"
})

/* used in strategy-proxy, global is to get around CORS restriction loading from blob url */
this.instance = System.import("src/model/strategy/cardplay/mcts-strategy")
   .then(function(mod) { return new mod.CardplayStrategy(); });
