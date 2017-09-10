open Jest;
open Expect;

describe "Board" (fun () => {

  describe "create" (fun () => {
    test "sets the dealer" (fun () => {
      let board = Board.create Seat.East;
      expect (board.dealer) |> toEqual Seat.East;
    });

    test "deals the hands" (fun () => {
      let board = Board.create Seat.East;
      expect (Card.SeatMap.find Seat.North board.hands |> List.length) |> toEqual 13;
      expect (Card.SeatMap.find Seat.East board.hands |> List.length) |> toEqual 13;
      expect (Card.SeatMap.find Seat.South board.hands |> List.length) |> toEqual 13;
      expect (Card.SeatMap.find Seat.West board.hands |> List.length) |> toEqual 13;
    });
  });

  describe "makeBid" (fun () => {
    open Bid;

    test "prepends the bid" (fun () => {
      let board = Board.create Seat.East
        |> Board.makeBid (Call 1 BidSuit.Hearts)
        |> Board.makeBid (Call 2 BidSuit.Spades);

      expect (List.length board.bids) |> toEqual 2;
      expect (List.nth board.bids 0) |> toEqual (Call 2 BidSuit.Spades);
      expect (List.nth board.bids 1) |> toEqual (Call 1 BidSuit.Hearts);
    });
  });
});

