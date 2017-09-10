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

    /*test "checks the range" (fun () => {
      let board = Board.create Seat.East;
      expect (fun () => 2 < 1 ? 4 : assert false) |> toThrow;
    });*/

  });
});

/*
	describe('validateBid', () => {
		it('checks the range', () => {
			let board = BoardBuilder
				.create()
				.toQuery();

			expect(validateBid(Bid.create("0S"), board)).to.not.be.undefined;
			expect(validateBid(Bid.create("8H"), board)).to.not.be.undefined;
		});

		it('allows only valid bids over no bids', () => {
			let board = BoardBuilder
				.create()
				.toQuery();

			expect(validateBid(Bid.create("1H"), board)).to.be.undefined;
			expect(validateBid(Bid.create("2H"), board)).to.be.undefined;
			expect(validateBid(Bid.create("no bid"), board)).to.be.undefined;
			expect(validateBid(Bid.create("double"), board)).to.not.be.undefined;
			expect(validateBid(Bid.create("redouble"), board)).to.not.be.undefined;
		});

		it('allows only valid bids over calls', () => {
			let board = BoardBuilder
				.create()
				.makeBid("1H")
				.toQuery();

			expect(validateBid(Bid.create("1D"), board)).to.not.be.undefined;
			expect(validateBid(Bid.create("1H"), board)).to.not.be.undefined;
			expect(validateBid(Bid.create("2H"), board)).to.be.undefined;
			expect(validateBid(Bid.create("double"), board)).to.be.undefined;
			expect(validateBid(Bid.create("redouble"), board)).to.not.be.undefined;
		});

		it('allows only valid bids over doubles', () => {
			let board = BoardBuilder
				.create()
				.makeBid("1H")
				.makeBid("no bid")
				.makeBid("no bid")
				.makeBid("double")
				.toQuery();

			expect(validateBid(Bid.create("1D"), board)).to.not.be.undefined;
			expect(validateBid(Bid.create("1H"), board)).to.not.be.undefined;
			expect(validateBid(Bid.create("2H"), board)).to.be.undefined;
			expect(validateBid(Bid.create("double"), board)).to.not.be.undefined;
			expect(validateBid(Bid.create("redouble"), board)).to.be.undefined;
		});

		it('allows only valid bids over redoubles', () => {
			let board = BoardBuilder
				.create()
				.makeBid("1H")
				.makeBid("double")
				.makeBid("redouble")
				.toQuery();


			expect(validateBid(Bid.create("1D"), board)).to.not.be.undefined;
			expect(validateBid(Bid.create("1H"), board)).to.not.be.undefined;
			expect(validateBid(Bid.create("2H"), board)).to.be.undefined;
			expect(validateBid(Bid.create("double"), board)).to.not.be.undefined;
			expect(validateBid(Bid.create("redouble"), board)).to.not.be.undefined;
		});

		it('disallows bids after the bidding has ended', () => {
			let board = BoardBuilder
				.create()
				.makeBid("1H")
				.makeBid("no bid")
				.makeBid("no bid")
				.makeBid("no bid")
				.toQuery();

			expect(validateBid(Bid.create("1D"), board)).to.not.be.undefined;
			expect(validateBid(Bid.create("1H"), board)).to.not.be.undefined;
			expect(validateBid(Bid.create("2H"), board)).to.not.be.undefined;
			expect(validateBid(Bid.create("no bid"), board)).to.not.be.undefined;
			expect(validateBid(Bid.create("double"), board)).to.not.be.undefined;
			expect(validateBid(Bid.create("redouble"), board)).to.not.be.undefined;
		});
	});
*/