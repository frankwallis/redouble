external getBid : Board.t => (Js.Promise.t Bid.t) = "getBid" [@@bs.module "../services/api"];

let rec newBoard dealer (store: Reductive.Store.t (ReduxThunk.thunk Store.appState) Store.appState) => {
  Reductive.Store.dispatch store (Store.GameAction (GameReducer.NewBoard dealer));
  scheduleAutoPlay store;
}

and makeBid bid forSequenceNo (store: Reductive.Store.t (ReduxThunk.thunk Store.appState) Store.appState) => {
  let state = Reductive.Store.getState store;

  if (forSequenceNo === state.game.sequenceNo) {
    let board = (List.nth state.game.history state.game.position);
    let error = Board.validateBid bid board;

    switch error {
    | Some message => Reductive.Store.dispatch store (Store.NotificationAction (NotificationReducer.Notify "error" "Invalid bid!" message))
    | None => {
        Reductive.Store.dispatch store (Store.GameAction (GameReducer.Push (Board.makeBid bid board)));
        scheduleAutoPlay store;
      }
    }
  }
  else {
    Js.log "the game has moved on";
  }
}

and scheduleAutoPlay store => {
  let state = Reductive.Store.getState store;
  let forSequenceNo = state.game.sequenceNo;

  ignore (
    Js.Global.setTimeout (fun () => {
      Reductive.Store.dispatch store (ReduxThunk.Thunk (autoPlay forSequenceNo))
    }) 2000
  )
}

and autoPlay forSequenceNo (store: Reductive.Store.t (ReduxThunk.thunk Store.appState) Store.appState) => {
  let state = Reductive.Store.getState store;

  if (forSequenceNo === state.game.sequenceNo) {
    let board = (List.nth state.game.history state.game.position);

    if (Board.biddingHasEnded board) {
      raise (Invalid_argument "NotImplemented")
    }
    else {
      Js.Promise.(
        ignore (
          getBid board
            |> then_ (fun bid => {
              Js.log bid;
              Reductive.Store.dispatch store (ReduxThunk.Thunk (makeBid bid forSequenceNo)) |> resolve;
            })
        )
      );
    }
  }
  else {
    Js.log "the game has moved on";
  }
};
