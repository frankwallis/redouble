module BidSuit = {
  type t =
    | Clubs
    | Diamonds
    | Hearts
    | Spades
    | NoTrumps;
  /* [@@bs.deriving ord]; */
  /* TODO find out how to use @@deriving ord */
  let compare suit1 suit2 =>
    if (suit1 === suit2) {
      0
    } else {
      let rec check lst suit1 suit2 =>
        if (List.hd lst === suit1) {
          1
        } else if (List.hd lst === suit2) {
          (-1)
        } else {
          check (List.tl lst) suit1 suit2
        };
      check [NoTrumps, Spades, Hearts, Diamonds, Clubs] suit1 suit2
    };
  /* ENDTODO */
  let all = [Clubs, Diamonds, Hearts, Spades, NoTrumps];
  let name =
    fun
    | NoTrumps => "notrumps"
    | Spades => "spades"
    | Hearts => "hearts"
    | Diamonds => "diamonds"
    | Clubs => "clubs";
  let description =
    fun
    | NoTrumps => "NT"
    | Spades => "S"
    | Hearts => "H"
    | Diamonds => "D"
    | Clubs => "C";
};

type t =
  | NoBid
  | Double
  | Redouble
  | Call int BidSuit.t;

let name =
  fun
  | NoBid => "nobid"
  | Double => "double"
  | Redouble => "redouble"
  | Call level suit => string_of_int level ^ BidSuit.name suit;

let description =
  fun
  | NoBid => "No Bid"
  | Double => "Double"
  | Redouble => "Redouble"
  | Call level suit => string_of_int level ^ BidSuit.description suit;

exception InvalidArgument string;

let compare bid1 bid2 =>
  switch (bid1, bid2) {
  | (Call level1 suit1, Call level2 suit2) =>
    if (level1 === level2) {
      BidSuit.compare suit1 suit2
    } else {
      level1 - level2
    }
  | _ => raise (InvalidArgument "Cannot compare bids which are not of type Call")
  };
