open Jest;
open Expect;

describe "Board" (fun () => {

  describe "fromPBN" (fun () => {
    test "sets the dealer" (fun () => {
      let board = Board.fromPBN "W: .35.. 23... ...78 ..2.";
      expect (board.dealer) |> toEqual Seat.West;
    });

    test "sets the cards for full hand" (fun () => {
      let board = Board.fromPBN "W: AKQJT98765432... .AKQJT98765432.. ..AKQJT98765432. ...AKQJT98765432";
      let south = Card.SeatMap.find Seat.South board.hands;
      expect south |> toEqual [
        (Card.Pip.Ace, Card.Suit.Clubs),
        (Card.Pip.King, Card.Suit.Clubs),
        (Card.Pip.Queen, Card.Suit.Clubs),
        (Card.Pip.Jack, Card.Suit.Clubs),
        (Card.Pip.Ten, Card.Suit.Clubs),
        (Card.Pip.Nine, Card.Suit.Clubs),
        (Card.Pip.Eight, Card.Suit.Clubs),
        (Card.Pip.Seven, Card.Suit.Clubs),
        (Card.Pip.Six, Card.Suit.Clubs),
        (Card.Pip.Five, Card.Suit.Clubs),
        (Card.Pip.Four, Card.Suit.Clubs),
        (Card.Pip.Three, Card.Suit.Clubs),
        (Card.Pip.Two, Card.Suit.Clubs)
      ];
    });

    test "sets the cards for partial hand" (fun () => {
      let board = Board.fromPBN "N: 2.2.. ..3.3 4.4.. ..5.5";
      let south = Card.SeatMap.find Seat.South board.hands;
      expect south |> toEqual [
        (Card.Pip.Four, Card.Suit.Spades),
        (Card.Pip.Four, Card.Suit.Hearts)
      ];
    });
  });
});
