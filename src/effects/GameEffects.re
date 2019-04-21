[@bs.module "../services/api"] external getBid : Board.t => Js.Promise.t(Bid.t) = "getBid";

[@bs.module "../services/api"] external getCard : Board.t => Js.Promise.t(Card.t) = "getCard";

let autoPlay = (gameState, makeBid, playCard) => {
  let board = GameReducer.currentBoard(gameState);

  let nextPlay = () => {
    if (Board.biddingHasEnded(board)) {
      Js.Promise.(
        ignore(
          getCard(board)
          |> then_(card => playCard(card) |> resolve)
        )
      )
    } else {
      Js.Promise.(
        ignore(
          getBid(board)
          |> then_(bid => makeBid(bid) |> resolve)
        )
      )
    }
  }

  if (!Board.playHasEnded(board)) {
    let timerId = Js.Global.setTimeout(nextPlay, 2000)
    Some(() => Js.Global.clearTimeout(timerId))
  } else {
    None;
  }
}

/*
and makeBid =
    (
      bid,
      forSequenceNo,
      store: Reductive.Store.t(ReduxThunk.thunk(Store.appState), Store.appState)
    ) => {
  let state = Reductive.Store.getState(store);
  if (forSequenceNo === state.game.sequenceNo) {
    let board = GameReducer.currentBoard(state.game);
    let error = Board.validateBid(bid, board);
    switch (error) {
    | Some(message) =>
      Reductive.Store.dispatch(
        store,
        Store.NotificationAction(NotificationReducer.Notify("error", "Invalid bid!", message))
      )
    | None =>
      Reductive.Store.dispatch(
        store,
        Store.GameAction(GameReducer.Push(Board.makeBid(bid, board)))
      );
      scheduleAutoPlay(store)
    }
  } else {
    Js.log("the game has moved on")
  }
}
and playCard =
    (
      card,
      forSequenceNo,
      store: Reductive.Store.t(ReduxThunk.thunk(Store.appState), Store.appState)
    ) => {
  let state = Reductive.Store.getState(store);
  if (forSequenceNo === state.game.sequenceNo) {
    let board = GameReducer.currentBoard(state.game);
    let error = Board.validateCard(card, board);
    switch (error) {
    | Some(message) =>
      Reductive.Store.dispatch(
        store,
        Store.NotificationAction(NotificationReducer.Notify("error", "Invalid card!", message))
      )
    | None =>
      Reductive.Store.dispatch(
        store,
        Store.GameAction(GameReducer.Push(Board.playCard(card, board)))
      );
      scheduleAutoPlay(store)
    }
  } else {
    Js.log("the game has moved on")
  }
}
and resume = (store: Reductive.Store.t(ReduxThunk.thunk(Store.appState), Store.appState)) => {
  Reductive.Store.dispatch(store, Store.GameAction(GameReducer.Resume));
  scheduleAutoPlay(store)
}
and scheduleAutoPlay = (store) => {
  let state = Reductive.Store.getState(store);
  let board = GameReducer.currentBoard(state.game);
  if (!Board.playHasEnded(board)) {
    let forSequenceNo = state.game.sequenceNo;
    ignore(
      Js.Global.setTimeout(
        () => Reductive.Store.dispatch(store, ReduxThunk.Thunk(autoPlay(forSequenceNo))),
        2000
      )
    )
  }
}
and autoPlay =
    (forSequenceNo, store: Reductive.Store.t(ReduxThunk.thunk(Store.appState), Store.appState)) => {
  let state = Reductive.Store.getState(store);
  if (forSequenceNo === state.game.sequenceNo) {
    let board = GameReducer.currentBoard(state.game);
    if (Board.biddingHasEnded(board)) {
      Js.Promise.(
        ignore(
          getCard(board)
          |> then_(
               (card) =>
                 Reductive.Store.dispatch(store, ReduxThunk.Thunk(playCard(card, forSequenceNo)))
                 |> resolve
             )
        )
      )
    } else {
      Js.Promise.(
        ignore(
          getBid(board)
          |> then_(
               (bid) => {
                 Js.log(bid);
                 Reductive.Store.dispatch(store, ReduxThunk.Thunk(makeBid(bid, forSequenceNo)))
                 |> resolve
               }
             )
        )
      )
    }
  } else {
    Js.log("the game has moved on")
  }
};
*/