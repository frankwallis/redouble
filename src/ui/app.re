external require : string => unit = "require" [@@bs.val];

require "normalize.css";
require "purecss";
require "font-awesome/css/font-awesome.css";

let component = ReasonReact.statelessComponent "AppComponent";

let make state::(state: Store.appState) ::dispatch _children => {
  ...component,
  render: fun _self =>
    <Main dispatch=dispatch notifications=state.notifications />
};