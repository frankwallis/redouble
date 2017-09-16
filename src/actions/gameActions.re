/* let incrementIfOdd (store: Reductive.Store.t (ReduxThunk.thunk Store.appState) Store.appState) =>
    switch (Reductive.Store.getState store) {
    | {counter} when counter mod 2 === 1 =>
    Reductive.Store.dispatch store (Store.GameAction GameReducer.NewGame)
    | _ => ()
}; */

let nextBoard dealer (store: Reductive.Store.t (ReduxThunk.thunk Store.appState) Store.appState) => {
  Reductive.Store.dispatch store (Store.GameAction (GameReducer.NewBoard dealer));
};

let makeBid bid (store: Reductive.Store.t (ReduxThunk.thunk Store.appState) Store.appState) => {
  let state = Reductive.Store.getState store;
  let board = (List.nth state.game.history state.game.position);
  let error = Board.validateBid bid board;

  switch error {
  | Some message => Reductive.Store.dispatch store (Store.NotificationAction (NotificationReducer.Notify "error" "b" message))
  | None => Reductive.Store.dispatch store (Store.GameAction (GameReducer.Push (Board.makeBid bid board)))
  }
};

/*
switch (Reductive.Store.getState store) {
  | {counter} when counter mod 2 === 1 =>
    Reductive.Store.dispatch store (ThunkedStore.CounterAction SimpleStore.Increment)
  | _ => ()
  };
let incrementAsync store =>
ignore (
ReasonJs.setTimeout
  (
    fun () =>
      Reductive.Store.dispatch store (ThunkedStore.CounterAction SimpleStore.Increment)
  )
  1000
);
*/