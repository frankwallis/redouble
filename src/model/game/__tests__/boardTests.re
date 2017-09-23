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
      let hands = (Card.SeatMap.bindings board.hands) |> List.map (fun (_seat, hand) => hand);
      expect (List.map (fun hand => List.length hand) hands) |> toEqual [13, 13, 13, 13];
    });
  });

  describe "makeBid" (fun () => {
    open Bid;

    test "prepends the bid" (fun () => {
      let board = Board.create Seat.East
        |> Board.makeBid (Call 1 BidSuit.Hearts)
        |> Board.makeBid (Call 2 BidSuit.Spades);

      expect (board.bids) |> toEqual [(Call 2 BidSuit.Spades), (Call 1 BidSuit.Hearts)]
    });
  });

  describe "validateBid" (fun () => {
    open Bid;

    testAll "rejects bids outside range" [(Call 0 BidSuit.Hearts), (Call 8 BidSuit.Hearts)] (fun bid => {
      let board = Board.create Seat.East;
      expect (Board.validateBid bid board) |> toEqual (Some "Invalid bid");
    });

    testAll "allows valid bids over no bids" [(Call 1 BidSuit.Hearts), (Call 2 BidSuit.Hearts), NoBid] (fun bid => {
      let board = Board.create Seat.East;
      expect (Board.validateBid bid board) |> toEqual None;
    });

    testAll "rejects double & redouble over no bid"
      [(Double, "Invalid double"), (Redouble, "Invalid redouble")] (fun (bid, message) => {
      let board = Board.create Seat.East;
      expect (Board.validateBid bid board) |> toEqual (Some message);
    });

    testAll "allows valid bids over calls"
      [(Call 2 BidSuit.Hearts), Double, NoBid] (fun bid => {
      let board = Board.create Seat.East
        |> Board.makeBid (Call 1 BidSuit.Hearts);
      expect (Board.validateBid bid board) |> toEqual None;
    });

    testAll "rejects invalid bids over calls" [
      ((Call 1 BidSuit.Diamonds), "Bid must be higher than 1H"),
      ((Call 1 BidSuit.Hearts), "Bid must be higher than 1H"),
      (Redouble, "Invalid redouble")
    ] (fun (bid, message) => {
      let board = Board.create Seat.East
        |> Board.makeBid (Call 1 BidSuit.Hearts);
      expect (Board.validateBid bid board) |> toEqual (Some message);
    });

    testAll "allows valid bids over double"
      [(Call 2 BidSuit.Hearts), Redouble, NoBid] (fun bid => {
      let board = Board.create Seat.East
        |> Board.makeBid (Call 1 BidSuit.Hearts)
        |> Board.makeBid Double;
      expect (Board.validateBid bid board) |> toEqual None;
    });

    testAll "rejects invalid bids over doubles" [
      ((Call 1 BidSuit.Diamonds), "Bid must be higher than 1H"),
      ((Call 1 BidSuit.Hearts), "Bid must be higher than 1H"),
      (Double, "Invalid double")
      ] (fun (bid, message) => {
      let board = Board.create Seat.East
        |> Board.makeBid (Call 1 BidSuit.Hearts)
        |> Board.makeBid Double;
      expect (Board.validateBid bid board) |> toEqual (Some message);
    });

    testAll "allows valid bids over redoubles"
      [ (Call 2 BidSuit.Hearts) ] (fun bid => {
        let board = Board.create Seat.East
          |> Board.makeBid (Call 1 BidSuit.Hearts)
          |> Board.makeBid Double
          |> Board.makeBid Redouble;

        expect (Board.validateBid bid board) |> toEqual None;
    });

    testAll "rejects invalid bids over redoubles" [
      ((Call 1 BidSuit.Diamonds), "Bid must be higher than 1H"),
      ((Call 1 BidSuit.Hearts), "Bid must be higher than 1H"),
      (Double, "Invalid double"),
      (Redouble, "Invalid redouble")
      ] (fun (bid, message) => {
        let board = Board.create Seat.East
          |> Board.makeBid (Call 1 BidSuit.Hearts)
          |> Board.makeBid Double
          |> Board.makeBid Redouble;
        expect (Board.validateBid bid board) |> toEqual (Some message);
    });

    testAll "disallows bids after the bidding has ended"
      [(Call 1 BidSuit.Diamonds), (Call 1 BidSuit.Hearts), (Call 2 BidSuit.Hearts), Double, Redouble, NoBid] (fun bid => {
      let board = Board.create Seat.East
        |> Board.makeBid (Call 1 BidSuit.Hearts)
        |> Board.makeBid NoBid
        |> Board.makeBid NoBid
        |> Board.makeBid NoBid;
      expect (Board.validateBid bid board) |> toEqual (Some "The bidding has already ended");
    });
  });
});
