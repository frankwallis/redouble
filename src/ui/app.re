include Store;
include NotificationReducer;

external require : string => unit = "require" [@@bs.val];

require "normalize.css";
require "purecss";
require "font-awesome/css/font-awesome.css";

type state = NotificationReducer.state;
type action = NotificationReducer.action;
let component = ReasonReact.reducerComponent "AppComponent";

let make _children => {
  ...component,
  initialState: NotificationReducer.initialState,
  reducer: fun action state => {
    ReasonReact.Update(NotificationReducer.reducer action state)
  },
  render: fun self => {
    <Main dispatch=(self.reduce(fun action => action)) notifications=self.state />;
  }
}