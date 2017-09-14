/*let makeBid bid => ReduxThunk.Thunk (store: Reductive.Store.t (Thunk.thunk Store.appState) Store.appState) {
  let errors = Board.validateBid(bid);

  switch errors {
  | Some messages => dispatch (NotificationReducer.Create "a" "b", "c")
  | None => dispatch (GameReducer.Push (Board.makeBid bid))
  }
};*/

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