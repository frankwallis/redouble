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

  describe "validateBid" (fun () => {
    open Bid;

    test "checks the range" (fun () => {
      let board = Board.create Seat.East;
      expect (Board.validateBid (Call 0 BidSuit.Hearts) board) |> toEqual (Some "Invalid bid");
      expect (Board.validateBid (Call 8 BidSuit.Hearts) board) |> toEqual (Some "Invalid bid");
    });

    test "allows only valid bids over no bids" (fun () => {
      let board = Board.create Seat.East;
      expect (Board.validateBid (Call 1 BidSuit.Hearts) board) |> toEqual None;
      expect (Board.validateBid (Call 2 BidSuit.Hearts) board) |> toEqual None;
      expect (Board.validateBid NoBid board) |> toEqual None;
      expect (Board.validateBid Double board) |> toEqual (Some "Invalid double");
      expect (Board.validateBid Redouble board) |> toEqual (Some "Invalid redouble");
    });

    test "allows only valid bids over calls" (fun () => {
      let board = Board.create Seat.East
        |> Board.makeBid (Call 1 BidSuit.Hearts);

      expect (Board.validateBid (Call 1 BidSuit.Diamonds) board) |> toEqual (Some "Bid must be higher than 1 heart");
      expect (Board.validateBid (Call 1 BidSuit.Hearts) board) |> toEqual (Some "Bid must be higher than 1 heart");
      expect (Board.validateBid (Call 2 BidSuit.Hearts) board) |> toEqual None;
      expect (Board.validateBid Double board) |> toEqual None;
      expect (Board.validateBid Redouble board) |> toEqual (Some "Invalid redouble");
    });

    test "allows only valid bids over doubles" (fun () => {
      let board = Board.create Seat.East
        |> Board.makeBid (Call 1 BidSuit.Hearts)
        |> Board.makeBid Double;

      expect (Board.validateBid (Call 1 BidSuit.Diamonds) board) |> toEqual (Some "Bid must be higher than 1 heart");
      expect (Board.validateBid (Call 1 BidSuit.Hearts) board) |> toEqual (Some "Bid must be higher than 1 heart");
      expect (Board.validateBid (Call 2 BidSuit.Hearts) board) |> toEqual None;
      expect (Board.validateBid Double board) |> toEqual (Some "Invalid double");
      expect (Board.validateBid Redouble board) |> toEqual None;
    });

    test "allows only valid bids over redoubles" (fun () => {
      let board = Board.create Seat.East
        |> Board.makeBid (Call 1 BidSuit.Hearts)
        |> Board.makeBid Double
        |> Board.makeBid Redouble;

      expect (Board.validateBid (Call 1 BidSuit.Diamonds) board) |> toEqual (Some "Bid must be higher than 1 heart");
      expect (Board.validateBid (Call 1 BidSuit.Hearts) board) |> toEqual (Some "Bid must be higher than 1 heart");
      expect (Board.validateBid (Call 2 BidSuit.Hearts) board) |> toEqual None;
      expect (Board.validateBid Double board) |> toEqual (Some "Invalid double");
      expect (Board.validateBid Redouble board) |> toEqual (Some "Invalid redouble");
    });

    test "disallows bids after the bidding has ended" (fun () => {
      let board = Board.create Seat.East
        |> Board.makeBid (Call 1 BidSuit.Hearts)
        |> Board.makeBid NoBid
        |> Board.makeBid NoBid
        |> Board.makeBid NoBid;

      expect (Board.validateBid (Call 1 BidSuit.Diamonds) board) |> toEqual (Some "The bidding has already ended");
      expect (Board.validateBid (Call 1 BidSuit.Hearts) board) |> toEqual (Some "The bidding has already ended");
      expect (Board.validateBid (Call 2 BidSuit.Hearts) board) |> toEqual (Some "The bidding has already ended");
      expect (Board.validateBid Double board) |> toEqual (Some "The bidding has already ended");
      expect (Board.validateBid Redouble board) |> toEqual (Some "The bidding has already ended");
    });
  });
});
