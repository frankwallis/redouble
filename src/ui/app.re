/*open RootReducer;*/

external require : string => unit = "require" [@@bs.val];

require "normalize.css";
require "purecss";
require "font-awesome/css/font-awesome.css";

type state = RootReducer.state;
type action = RootReducer.action;
let component = ReasonReact.reducerComponent "AppComponent";

let make _children => {
  ...component,
  initialState: RootReducer.initialState,
  reducer: fun action state => {
    ReasonReact.Update(RootReducer.reducer action state)
  },
  render: fun {state, reduce} => {
    <Main dispatch=(reduce(fun action => action)) notifications=state.notifications />;
  }
}