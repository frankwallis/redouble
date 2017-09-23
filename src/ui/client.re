external require : string => unit = "require" [@@bs.val];
require "normalize.css";
require "purecss";
require "font-awesome/css/font-awesome.css";

module ThunkedStoreProvider = {
  let make = Reductive.Provider.createMake Store.store;
};

ReactDOMRe.renderToElementWithId <ThunkedStoreProvider component=App.make /> "main";