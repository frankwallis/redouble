external require : string => unit = "require" [@@bs.val];
require "normalize.css";
require "purecss";
require "font-awesome/css/font-awesome.css";

Js.log "Do you see this message? If you do, then things should work!";

module ThunkedStoreProvider = {
  let make = Reductive.Provider.createMake Store.store;
};

ReactDOMRe.renderToElementWithId <ThunkedStoreProvider component=App.make /> "main";