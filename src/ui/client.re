NodeUtils.require "normalize.css";
NodeUtils.require "purecss";
NodeUtils.require "font-awesome/css/font-awesome.css";

module ThunkedStoreProvider = {
  let make = Reductive.Provider.createMake Store.store;
};

ReactDOMRe.renderToElementWithId <ThunkedStoreProvider component=App.make /> "main";