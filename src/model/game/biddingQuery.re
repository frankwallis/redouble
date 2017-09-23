open Bid;
open BoardType;

type zippedBid = {
  seat: Seat.t,
  bid: Bid.t
};

let nextBidder board => Seat.rotateN board.dealer (List.length board.bids);
let lastBidder board => Seat.rotateN (nextBidder board) (-1);

let biddingHasEnded board =>
  switch board.bids {
  | [NoBid, NoBid, NoBid, NoBid] => true
  | [NoBid, NoBid, NoBid, _, ..._] => true
  | _ => false
  };

let zipBids board => {
  let rec zipBidsIter bids current => {
    switch bids {
    | [] => []
    | [hd, ...tl] => [{ seat: current, bid: hd }, ...(zipBidsIter tl (Seat.rotateN current (-1)))]
    }
  };
  zipBidsIter board.bids (lastBidder board)
};

let lastBid board =>
  switch (zipBids board) {
  | [] => None
  | [hd, ..._] => Some hd
  };

let lastCall board => {
  let rec lastCallIter zippedBids =>
    switch (zippedBids) {
    | [] => None
    | [hd, ...tl] =>
      switch hd {
      | { seat: _, bid: (Call _ _) } => Some hd
      | _ => lastCallIter tl
      }
    };
  lastCallIter (zipBids board);
};

let lastAction board => {
  let rec lastActionIter zippedBids =>
    switch (zippedBids) {
    | [] => None
    | [hd, ...tl] =>
      switch hd {
      | { seat: _, bid: NoBid } => lastActionIter tl
      | _ => Some hd
      }
    };
  lastActionIter (zipBids board);
};

let declarer board =>
  if (biddingHasEnded board) {
    /* TODO: replace with? (lastCall bids) |> Option.map (fun call => call.suit) */
    switch (lastCall board) {
    | Some { seat: lastCaller, bid: (Call _ lastSuit) } => {
      let rec find lst => {
        switch lst {
        | [] => None
        | [{ seat: caller, bid: (Call _ suit) }, ...tl] =>
          (suit === lastSuit) && (Seat.isSameSide caller lastCaller) ? (Some caller) : find tl
        | [_, ...tl] => find tl
        }
      };
      find (List.rev (zipBids board))
    }
    | _ => None
    }
  } else {
    None
  };

let contractSuit board =>
  if (biddingHasEnded board) {
    /* TODO: replace with? (lastCall bids) |> Option.map (fun call => call.suit) */
    switch (lastCall board) {
    | Some { seat: _, bid: (Call _ suit) } => Some suit
    | _ => None
    }
  } else {
    None
  };

