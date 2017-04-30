include Store;

include NotificationReducer;

external require : string => unit = "require" [@@bs.val];

require "normalize.css";

require "purecss";

require "font-awesome/css/font-awesome.css";

module App = {
  include ReactRe.Component.Stateful;
  let name = "App";
  type props = unit;
  type state = Program.PStore.state;
  let getInitialState () => Program.PStore.getState ();
  let handleNotify _ _ => Some (Program.PStore.getState ());
  let componentDidMount {updater} => {
    Program.PStore.subscribe (updater handleNotify);
    None
  };
  let render {state} => <Main dispatch=Program.PStore.dispatch theState=state />;
};

include ReactRe.CreateComponent App;

let createElement ::children => wrapProps () ::children;
