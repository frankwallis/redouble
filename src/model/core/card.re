module Suit = {
  type t =
    | Clubs
    | Diamonds
    | Hearts
    | Spades;
  let all = [Spades, Hearts, Diamonds, Clubs];
  let name = suit => switch(suit) {
    | Spades => "spades"
    | Hearts => "hearts"
    | Diamonds => "diamonds"
    | Clubs => "clubs"
  };
  /* TODO - deriving ord */
  let value = suit => switch(suit) {
    | Clubs => 1
    | Diamonds => 2
    | Hearts => 3
    | Spades => 4
  };
  let compare = (a, b) => value(a) - value(b);
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
  let values = [14, 13, 12, 11, 10, 9, 8, 7, 6, 5, 4, 3, 2];
  let name = pip => switch(pip) {
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
    | Two => "2"
  };
  /* TODO - deriving ord */
  let toValue = (pip) => List.assoc(pip, List.combine(all, values));
  let fromValue = (value) => List.assoc(value, List.combine(values, all));
  let compare = (a, b) => toValue(a) - toValue(b);
  /* END TODO */
  let fromPBN = (pbn) => switch pbn {
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
    | _ => raise(Invalid_argument("Invalid PBN Pip [" ++ (pbn ++ "]")))
    };
  let toPBN = pip => switch(pip) {
    | Ace => "A"
    | King => "K"
    | Queen => "Q"
    | Jack => "J"
    | Ten => "T"
    | pip => string_of_int(toValue(pip))
  };
};

module SeatMap = Map.Make(Seat);

module SuitMap = Map.Make(Suit);

type t = (Pip.t, Suit.t);

let name = ((pip, suit)) => Pip.name(pip) ++ Suit.name(suit);

let compare = ((pip1, suit1), (pip2, suit2)) =>
  switch (Suit.compare(suit1, suit2)) {
  | 0 => Pip.compare(pip1, pip2)
  | value => value
  };

let deck =
  Suit.all
  |> List.fold_left(
       (result, suit) =>
         Pip.all |> List.fold_left((result2, pip) => [(pip, suit), ...result2], result),
       []
     );

let shuffle = (cards) =>
  cards
  |> List.map((card) => (Random.bits(), card))
  |> List.sort(((rand1, _), (rand2, _)) => rand1 - rand2)
  |> List.map(((_, card)) => card);

let deal = (dealer) => {
  let pushCard = (card, seat, hands) =>
    switch (SeatMap.find(seat, hands)) {
    | hand => hands |> SeatMap.add(seat, [card, ...hand])
    | exception Not_found => hands |> SeatMap.add(seat, [card])
    };
  let rec dealNext = (cards, seat, hands) =>
    switch cards {
    | [] => hands
    | [hd, ...tl] => dealNext(tl, Seat.rotate(seat), pushCard(hd, seat, hands))
    };
  dealNext(shuffle(deck), dealer, SeatMap.empty)
  |> SeatMap.map((cards) => cards |> List.sort(compare) |> List.rev)
};
