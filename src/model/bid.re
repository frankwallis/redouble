module BidSuit = {
  type t = Clubs | Diamonds | Hearts | Spades | NoTrumps;
  let all = [NoTrumps, Spades, Hearts, Diamonds, Clubs];
  let name = fun
    | NoTrumps => "notrumps"
    | Spades => "spades"
    | Hearts => "hearts"
    | Diamonds => "diamonds"
    | Clubs => "clubs";
};

module Bid = {
  type t = NoBid | Double | Redouble | Call int BidSuit.t;
  let name = fun
    | NoBid => "nobid"
    | Double => "double"
    | Redouble => "redouble"
    | Call level suit => string_of_int level ^ BidSuit.name suit;
};
