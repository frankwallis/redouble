open Jest;
open Expect;

describe "BidQuery" (fun () => {
  open BidQuery;
  open Bid;

  /* TODO use the new bs-jest combinators when they arrive */
  describe "isSlamBid" (fun () => {
    test "returns false for bids < 6" (fun () => {
      expect (isSlamBid (Call 5 BidSuit.Hearts)) |> toEqual false;
    });

    test "returns false for Double" (fun () => {
      expect (isSlamBid (Double)) |> toEqual false;
    });

    test "returns true for bids of 6" (fun () => {
      expect (isSlamBid (Call 6 BidSuit.Spades)) |> toEqual true;
    });
  });

  describe "isGameBid" (fun () => {
    test "returns false for majors < 4" (fun () => {
      expect (isGameBid (Call 3 BidSuit.Hearts)) |> toEqual false;
    });

    test "returns true for majors >= 4" (fun () => {
      expect (isGameBid (Call 4 BidSuit.Hearts)) |> toEqual true;
    });

    test "returns false for minors < 5" (fun () => {
      expect (isGameBid (Call 4 BidSuit.Diamonds)) |> toEqual false;
    });

    test "returns true for minors >= 5" (fun () => {
      expect (isGameBid (Call 5 BidSuit.Diamonds)) |> toEqual true;
    });

    test "returns false for no-trumps < 3" (fun () => {
      expect (isGameBid (Call 2 BidSuit.NoTrumps)) |> toEqual false;
    });

    test "returns true for minors >= 5" (fun () => {
      expect (isGameBid (Call 3 BidSuit.NoTrumps)) |> toEqual true;
    });

    test "returns false for Double" (fun () => {
      expect (isSlamBid (Double)) |> toEqual false;
    });
  });
});
