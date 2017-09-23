module Suit = {
  type t =
    | Clubs
    | Diamonds
    | Hearts
    | Spades;
  let all = [Spades, Hearts, Diamonds, Clubs];
  let name = fun
    | Spades => "spades"
    | Hearts => "hearts"
    | Diamonds => "diamonds"
    | Clubs => "clubs";

  /* TODO - deriving ord */
  let value = fun
    | Clubs => 1
    | Diamonds => 2
    | Hearts => 3
    | Spades => 4;

  let compare a b => value a - value b;
  /* END TODO */
};

module Pip = {
  type t =
    | Two
    | Three
    | Four
    | Five
    | Six
    | Seven
    | Eight
    | Nine
    | Ten
    | Jack
    | Queen
    | King
    | Ace;
  let all = [Ace, King, Queen, Jack, Ten, Nine, Eight, Seven, Six, Five, Four, Three, Two];
  let name = fun
    | Ace => "A"
    | King => "K"
    | Queen => "Q"
    | Jack => "J"
    | Ten => "10"
    | Nine => "9"
    | Eight => "8"
    | Seven => "7"
    | Six => "6"
    | Five => "5"
    | Four => "4"
    | Three => "3"
    | Two => "2";

  let fromPBN pbn => switch pbn {
  | "A" => Ace
  | "K" => King
  | "Q" => Queen
  | "J" => Jack
  | "T" => Ten
  | "9" => Nine
  | "8" => Eight
  | "7" => Seven
  | "6" => Six
  | "5" => Five
  | "4" => Four
  | "3" => Three
  | "2" => Two
  | _ => raise (Invalid_argument ("Invalid PBN Pip [" ^ pbn ^ "]"))
  };

  /* TODO - deriving ord */
  let value = fun
  | Ace => 14
  | King => 13
  | Queen => 12
  | Jack => 11
  | Ten => 10
  | Nine => 9
  | Eight => 8
  | Seven => 7
  | Six => 6
  | Five => 5
  | Four => 4
  | Three => 3
  | Two => 2;

  let compare a b => value a - value b;
  /* END TODO */
};

module SeatMap = Map.Make Seat;
module SuitMap = Map.Make Suit;

type t = (Pip.t, Suit.t);

let deck =
  Suit.all |> List.fold_left (fun result suit => {
    Pip.all |> List.fold_left (fun result2 pip => [(pip, suit), ...result2]) result
  }) [];

let shuffle cards =>
  cards |> List.map (fun card => (Random.bits (), card)) |>
  List.sort (fun (rand1, _) (rand2, _) => rand1 - rand2) |>
  List.map (fun (_, card) => card);

let deal dealer => {
  let pushCard card seat hands =>
    switch (SeatMap.find seat hands) {
    | hand => hands |> SeatMap.add seat [card, ...hand]
    | exception Not_found => hands |> SeatMap.add seat [card]
    };
  let rec dealNext cards seat hands =>
    switch cards {
    | [] => hands
    | [hd, ...tl] => dealNext tl (Seat.rotate seat) (pushCard hd seat hands)
    };
  dealNext (shuffle deck) dealer SeatMap.empty
};

let name (pip, suit) => Pip.name pip ^ Suit.name suit;

let handFromPBN pbn => {
  let holdings = List.combine Suit.all (Utils.split_on_char '.' pbn);
  holdings |> List.fold_left (fun result (suit, holding) => {
    result @ (Utils.to_list holding |> List.map (fun pip => {
      (Pip.fromPBN pip, suit)
    }))
  }) [];
};

let compare (pip1, suit1) (pip2, suit2) => {
  switch (Pip.compare pip1 pip2) {
  | 0 => Suit.compare suit1 suit2
  | value => value
  }
};
