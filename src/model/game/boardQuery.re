open Bid;
open Board;

module BidList = {
  let lastBid bids => switch bids {
    | [] => None
    | [hd,...tl] => Some hd
  };

  let rec lastCall bids => switch bids {
    | [] => None
    | [hd,...tl] => switch hd {
      | Call _ _ => Some hd
      | _ => lastCall tl
      }
    };

  let rec lastAction bids => switch bids {
    | [] => None
    | [hd,...tl] => switch hd {
      | NoBid => lastAction tl
      | _ => Some hd
      }
    };

  let biddingHasEnded bids => switch bids {
    | [NoBid, NoBid, NoBid, NoBid] => true
    | [NoBid, NoBid, NoBid, ...tl] => true
    | _ => false
  };

  let trumpSuit bids =>
    if (biddingHasEnded bids) {
      switch (lastCall bids) {
      | None => None
      | Some (Call _ suit) => Some(suit)
      }
    } else {
      None
    }
};

let lastBid board => BidList.lastBid board.bids;
let lastCall board => BidList.lastCall board.bids;
let lastAction board => BidList.lastAction board.bids;
let biddingHasEnded board => BidList.biddingHasEnded board.bids;
let trumpSuit board => BidList.trumpSuit board.bids;
