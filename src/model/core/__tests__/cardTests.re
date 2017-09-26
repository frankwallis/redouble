open Jest;
open Expect;
open Card;

describe "Card" (fun () => {
  describe "deck" (fun () => {
    test "should have 52 cards" (fun () => {
      expect (List.length Card.deck) |> toEqual 52;
    })
  });

  describe "shuffle" (fun () => {
    test "returns cards in a different order" (fun () => {
      let shuffled1 = Card.deck |> Card.shuffle;
      let shuffled2 = Card.deck |> Card.shuffle;
      expect (shuffled1) |> not_ |> toEqual shuffled2;
    })
  });

  describe "deal" (fun () => {
    test "assigns 13 cards to each seat" (fun () => {
      let hands = Card.deal Seat.North;
      let handList = (SeatMap.bindings hands) |> List.map (fun (_seat, hand) => hand);
      expect (List.map (fun hand => List.length hand) handList) |> toEqual [13, 13, 13, 13];
    });

   test "sorts the cards in each hand in descending order" (fun () => {
      let rec is_sorted = fun
      | [] => true
      | [_hd] => true
      | [hd, h2, ...tl] => ((Card.compare hd h2) > 0) && (is_sorted [h2, ...tl]);

      let hands = Card.deal Seat.North;
      expect (hands |> SeatMap.for_all (fun _seat hand => is_sorted hand)) |> toEqual true;
    });
  });

  describe "compare" (fun () => {
    test "recognises equality" (fun () => {
      expect (Card.compare (Pip.Eight, Suit.Spades) (Pip.Eight, Suit.Spades)) |> toEqual 0;
    });

    test "obeys order of precedence of pips" (fun () => {
      expect (Card.compare (Pip.Ace, Suit.Spades) (Pip.King, Suit.Spades)) |> toBeGreaterThan 0;
    });

    test "obeys order of precedence of suits" (fun () => {
      expect (Card.compare (Pip.Ace, Suit.Spades) (Pip.Ace, Suit.Hearts)) |> toBeGreaterThan 0;
    });
  });
});
