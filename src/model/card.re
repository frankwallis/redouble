include Seat;

module Suit = {
  type t = Clubs | Diamonds | Hearts | Spades;
  let all = [Spades, Hearts, Diamonds, Clubs];
  let name = fun
    | Spades => "spades"
    | Hearts => "hearts"
    | Diamonds => "diamonds"
    | Clubs => "clubs";
};

module Pip = {
  type t = Ace | King | Queen | Jack | Ten | Nine | Eight | Seven | Six | Five | Four | Three | Two;
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
};

module Card = {
  type card = (Pip.t, Suit.t);
  type t = card;

  let deck = {
    Suit.all |> List.fold_left (fun result suit => {
      Pip.all |> List.fold_left (fun result2 pip => {
        [(pip, suit), ...result2];
      }) result;
    }) [];
  };

  let shuffle cards => {
    cards |>
      List.map (fun card => (Random.bits (), card)) |>
      List.sort (fun (rand1, _) (rand2, _) => (rand1 - rand2)) |>
      List.map (fun (_, card) => card)
  };

  let deal dealer => {
    let pushCard card seat hands => {
      switch (SeatMap.find seat hands) {
        | hand => hands |> SeatMap.add seat [card, ...hand]
        | exception Not_found => hands |> SeatMap.add seat [card]
      };
    };
    let rec dealNext cards seat hands =>
      switch cards {
        | [] => hands
        | [hd, ...tl] => dealNext tl (Seat.rotate seat) (pushCard hd seat hands)
      };
    dealNext (shuffle deck) dealer SeatMap.empty;
  };
  let name (pip, suit) => Pip.name(pip) ^ Suit.name(suit);
};
