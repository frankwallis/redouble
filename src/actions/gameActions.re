let nextBoard dealer (store: Reductive.Store.t (ReduxThunk.thunk Store.appState) Store.appState) => {
  Reductive.Store.dispatch store (Store.GameAction (GameReducer.NewBoard dealer));
};

let makeBid bid (store: Reductive.Store.t (ReduxThunk.thunk Store.appState) Store.appState) => {
  let state = Reductive.Store.getState store;
  let board = (List.nth state.game.history state.game.position);
  let error = Board.validateBid bid board;

  switch error {
  | Some message => Reductive.Store.dispatch store (Store.NotificationAction (NotificationReducer.Notify "error" "Invalid bid!" message))
  | None => Reductive.Store.dispatch store (Store.GameAction (GameReducer.Push (Board.makeBid bid board)))
  }
};