module BidSuit = {
  type t = | Clubs | Diamonds | Hearts | Spades | NoTrumps; /* [@@deriving variants];*/
  let all = [NoTrumps, Spades, Hearts, Diamonds, Clubs];
  let name = fun
    | NoTrumps => "notrumps"
    | Spades => "spades"
    | Hearts => "hearts"
    | Diamonds => "diamonds"
    | Clubs => "clubs";
  let describe = fun
    | NoTrumps => "NT"
    | Spades => "S"
    | Hearts => "H"
    | Diamonds => "D"
    | Clubs => "C";
};

module Bid = {
  type t =
    | NoBid
    | Double
    | Redouble
    | Call int BidSuit.t;
  let name = fun
    | NoBid => "nobid"
    | Double => "double"
    | Redouble => "redouble"
    | Call level suit => string_of_int level ^ BidSuit.name suit;
  let describe = fun
    | NoBid => "No Bid"
    | Double => "Double"
    | Redouble => "Redouble"
    | Call level suit => string_of_int level ^ BidSuit.describe suit;
};
