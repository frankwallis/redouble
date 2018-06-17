open Jest;

open Expect;

open Card;

describe(
  "Card",
  () => {
    describe(
      "deck",
      () => test("should have 52 cards", () => expect(List.length(Card.deck)) |> toEqual(52))
    );
    describe(
      "shuffle",
      () =>
        test(
          "returns cards in a different order",
          () => {
            let shuffled1 = Card.deck |> Card.shuffle;
            let shuffled2 = Card.deck |> Card.shuffle;
            expect(shuffled1) |> not_ |> toEqual(shuffled2)
          }
        )
    );
    describe(
      "deal",
      () => {
        test(
          "assigns 13 cards to each seat",
          () => {
            let hands = Card.deal(Seat.North);
            let handList = SeatMap.bindings(hands) |> List.map(((_seat, hand)) => hand);
            expect(List.map((hand) => List.length(hand), handList)) |> toEqual([13, 13, 13, 13])
          }
        );
        test(
          "sorts the cards in each hand in descending order",
          () => {
            let rec is_sorted =
              fun
              | [] => true
              | [_hd] => true
              | [hd, h2, ...tl] => Card.compare(hd, h2) > 0 && is_sorted([h2, ...tl]);
            let hands = Card.deal(Seat.North);
            expect(hands |> SeatMap.for_all((_seat, hand) => is_sorted(hand))) |> toEqual(true)
          }
        )
      }
    );
    describe(
      "compare",
      () => {
        test(
          "recognises equality",
          () =>
            expect(Card.compare((Pip.Eight, Suit.Spades), (Pip.Eight, Suit.Spades))) |> toEqual(0)
        );
        test(
          "obeys order of precedence of pips",
          () =>
            expect(Card.compare((Pip.Ace, Suit.Spades), (Pip.King, Suit.Spades)))
            |> toBeGreaterThan(0)
        );
        test(
          "obeys order of precedence of suits",
          () =>
            expect(Card.compare((Pip.Ace, Suit.Spades), (Pip.Ace, Suit.Hearts)))
            |> toBeGreaterThan(0)
        )
      }
    )
  }
);
