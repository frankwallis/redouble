let component = ReasonReact.statelessComponent "App";

let make state::(state: Store.appState) ::dispatch _children => {
  let notifications = state.notifications.items;
  let board = List.nth state.game.history state.game.position;
  let dismiss id => dispatch (Store.NotificationAction (NotificationReducer.Dismiss id));
  let makeBid bid => dispatch (ReduxThunk.Thunk (GameActions.makeBid bid state.game.sequenceNo));
  {
    ...component,
    render: fun _self => {
      <Main notifications dismiss board makeBid />
    }
  }
};