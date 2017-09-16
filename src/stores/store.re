type appState = {
  notifications: NotificationReducer.state,
  game: GameReducer.state
};

type ReduxThunk.thunk _ +=
  | GameAction GameReducer.action
  | NotificationAction NotificationReducer.action;

let appInitialState = {
  notifications: NotificationReducer.initialState,
  game: GameReducer.initialState
};
let appReducer state action => {
  switch action {
    | GameAction gameAction => {...state, game: GameReducer.reducer state.game gameAction }
    | NotificationAction notificationAction => {...state, notifications: NotificationReducer.reducer state.notifications notificationAction }
    | _ => state
  }
};

let storeEnhancer store next =>
  ReduxThunk.middleware store @@
  Logger.middleware store @@
  next;

let store = Reductive.Store.create reducer::appReducer preloadedState::appInitialState enhancer::storeEnhancer ();