type t = {
  dealer: Seat.t,
  hands: Card.SeatMap.t (list Card.t),
  bids: list Bid.t,
  cards: list Card.t
};

let create dealer => {
  let hands = Card.deal dealer;
  { dealer, hands, bids: [], cards: [] }
};

exception ValidationError string;

let validateBid bid board => {
  None;
};

let makeBid bid board => {
  switch (validateBid bid board) {
  | None => ({ ...board, bids: (List.append board.bids [ bid ]) })
  | Some err => raise (ValidationError err);
  }
};

let validateCard card board => {
  None;
};

let playCard card board => {
  switch (validateCard card board) {
    | None => ({ ...board, cards: (List.append board.cards [ card ]) })
    | Some err => raise (ValidationError err);
    }
};