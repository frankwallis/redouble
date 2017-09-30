open BoardType;
open BiddingQuery;

let create dealer => {
  let hands = Card.deal dealer;
  {dealer, hands, bids: [], cards: []}
};

let validateBid bid board =>
  if (biddingHasEnded board) {
    Some "The bidding has already ended"
  } else {
    let bidder = (nextBidder board);

    switch bid {
    | Bid.NoBid => None
    | Bid.Double =>
      switch (lastAction board) {
      | Some { seat: lastCaller, bid: (Bid.Call _ _)} =>
        Seat.isPartner lastCaller bidder ?
          Some "You cannot double your partner!" : None
      | _ => Some "Invalid double"
      }
    | Bid.Redouble =>
      switch (lastAction board) {
      | Some { seat: lastDoubler, bid: Bid.Double } =>
        Seat.isPartner lastDoubler bidder ?
          Some "You cannot redouble your partner's double!" : None
      | _ => Some "Invalid redouble"
      }
    | Bid.Call level _suit =>
      if (level < 1 || level > 7) {
        Some "Invalid bid"
      } else {
        switch (lastCall board) {
        | Some { seat: _, bid: lastBid } => {
            switch (lastBid) {
            | (Call _ _) => ((Bid.compare bid lastBid) <= 0) ? Some ("Bid must be higher than " ^ (Bid.description lastBid)) : None
            | _ => None
            }
          }
        | _ => None
        }
      }
    }
  };

exception ValidationError string;

let makeBid bid board =>
  switch (validateBid bid board) {
  | None => {...board, bids: [bid, ...board.bids] }
  | Some err => raise (ValidationError err)
  };

let makeBids bids board =>
  bids |> List.fold_left (fun result bid => makeBid bid result) board;

let validateCard _card _board => None;

let playCard card board =>
  switch (validateCard card board) {
  | None => {...board, cards: [card, ...board.cards] }
  | Some err => raise (ValidationError err)
  };

let playTrick cards board =>
  cards |> List.fold_left (fun result card => playCard card result) board;
