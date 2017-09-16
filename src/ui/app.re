external require : string => unit = "require" [@@bs.val];

require "normalize.css";
require "purecss";
require "font-awesome/css/font-awesome.css";

let component = ReasonReact.statelessComponent "AppComponent";

let make state::(state: Store.appState) ::dispatch _children => {
  let notifications = state.notifications;
  let board = List.nth state.game.history state.game.position;
  let dismiss id => dispatch (Store.NotificationAction (NotificationReducer.Dismiss id));
  let makeBid bid => dispatch (ReduxThunk.Thunk (GameActions.makeBid bid));
  {
    ...component,
    render: fun _self => {
      <Main dismiss=dismiss notifications=notifications board=board makeBid=makeBid />
    }
  }
};