let component = ReasonReact.statelessComponent "App";

let make state::(state: Store.appState) ::dispatch _children => {
  let notifications = state.notifications.items;
  let dismiss id => dispatch (Store.NotificationAction (NotificationReducer.Dismiss id));
  let board = GameReducer.currentBoard state.game;
  let makeBid bid => dispatch (ReduxThunk.Thunk (GameActions.makeBid bid state.game.sequenceNo));
  let playCard card => dispatch (ReduxThunk.Thunk (GameActions.playCard card state.game.sequenceNo));
  let pause () => dispatch (Store.GameAction GameReducer.Pause);
  let canPause = GameReducer.canPause state.game;
  let resume () => dispatch (ReduxThunk.Thunk GameActions.resume);
  let canResume = GameReducer.canResume state.game;
  let back () => dispatch (Store.GameAction GameReducer.Back);
  let canBack = GameReducer.canBack state.game;
  let forward () => dispatch (Store.GameAction GameReducer.Forward);
  let canForward = GameReducer.canForward state.game;
  let jumpBack () => dispatch (Store.GameAction GameReducer.JumpBack);
  let canJumpBack = GameReducer.canJumpBack state.game;
  {
    ...component,
    render: fun _self => {
      <Main
        notifications dismiss board makeBid playCard
        pause canPause resume canResume back canBack forward canForward jumpBack canJumpBack />
    }
  }
};