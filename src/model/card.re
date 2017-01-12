include Seat;

type suit = Club | Diamond | Heart | Spade;
type pip = Ace | King | Queen | Jack | Ten | Nine | Eight | Seven | Six | Five | Four | Three | Two;
type card = (pip, suit);
/*type card1 = {.
  pip: pip,
  suit: suit
};*/

module Suit = {
  type t = suit;
  let all = [Spade, Heart, Diamond, Club];
};

module Pip = {
  type t = pip;
  let all = [Ace, King, Queen, Jack, Ten, Nine, Eight, Seven, Six, Five, Four, Three, Two];
};

module Card = {
  type t = card;

  let deck = {
    Suit.all |> List.fold_left (fun result asuit => {
      Pip.all |> List.fold_left (fun result2 apip => {
        [(apip, asuit), ...result2];
      }) result;
    }) [];
  };

  let shuffle cards => {
    cards |>
      List.map (fun card => (Random.bits (), card)) |>
      List.sort (fun (rand1, _) (rand2, _) => (rand1 - rand2)) |>
      List.map (fun (_, card) => card)
  };

  let deal (dealer) => {
    let rec dealNext cards aseat hands =>
      switch cards {
        | [] => hands
        | [hd, ...tl] => dealNext tl (Seat.rotate aseat) (SeatMap.add aseat hd hands)
      };
    dealNext (shuffle deck) dealer SeatMap.empty;
  };
};
