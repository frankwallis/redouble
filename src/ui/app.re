include Store;

include NotificationReducer;

external require : string => unit = "require" [@@bs.val];

require "normalize.css";

require "purecss";

require "font-awesome/css/font-awesome.css";

module App = {
  include ReactRe.Component;
  let name = "App";
  type props = unit;
  let render _ => <Main dispatch=Program.PStore.dispatch theState=(Program.PStore.getState ()) />;
};

include ReactRe.CreateComponent App;

let createElement ::children => wrapProps () ::children;
