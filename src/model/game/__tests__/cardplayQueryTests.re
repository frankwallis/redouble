open Jest;
open Expect;

describe "CardplayQuery" (fun () => {
  open CardplayQuery;
  open Card;
  open Bid;

  describe "currentTrick" (fun () => {
    test "returns [] when the bidding has not ended" (fun () => {
      let board = Board.fromPBN "W: AKQJT98765432... .AKQJT98765432.. ..AKQJT98765432. ...AKQJT98765432";
      expect (currentTrick board) |> toEqual [];
    });

    test "returns a list containing 3 cards when 3 cards have been played" (fun () => {
      let trick = [(Pip.Four, Suit.Clubs), (Pip.Queen, Suit.Clubs), (Pip.Six, Suit.Clubs)];
      let board = Board.fromPBN "W: AK76.QJ5.T94.832 832.AK76.QJ5.T94 T94.832.AK76.QJ5 QJ5.T94.832.AK76"
      |> Board.makeBids [(Call 1 BidSuit.Spades), NoBid, NoBid, NoBid]
      |> Board.playTrick trick;
      expect (currentTrick board) |> toEqual trick;
    });

    test "returns the last 2 cards when 6 cards have been played" (fun () => {
      let trick = [(Pip.Ace, Suit.Diamonds), (Pip.Two, Suit.Diamonds)];
      let board = Board.fromPBN "W: AK76.QJ5.T94.832 832.AK76.QJ5.T94 T94.832.AK76.QJ5 QJ5.T94.832.AK76"
        |> Board.makeBids [(Call 1 BidSuit.Spades), NoBid, NoBid, NoBid]
        |> Board.playTrick [(Pip.Four, Suit.Clubs), (Pip.Queen, Suit.Clubs), (Pip.Six, Suit.Clubs), (Pip.Two, Suit.Clubs)]
        |> Board.playTrick trick;
      expect (currentTrick board) |> toEqual trick;
    });

    test "returns [] when 8 cards have been played" (fun () => {
      let board = Board.fromPBN "W: AK76.QJ5.T94.832 832.AK76.QJ5.T94 T94.832.AK76.QJ5 QJ5.T94.832.AK76"
        |> Board.makeBids [(Call 1 BidSuit.Spades), NoBid, NoBid, NoBid]
        |> Board.playTrick [(Pip.Four, Suit.Clubs), (Pip.Queen, Suit.Clubs), (Pip.Six, Suit.Clubs), (Pip.Two, Suit.Clubs)]
        |> Board.playTrick [(Pip.Ace, Suit.Diamonds), (Pip.Two, Suit.Diamonds), (Pip.Four, Suit.Diamonds), (Pip.Five, Suit.Diamonds)];
        expect (currentTrick board) |> toEqual [];
    });
  });

  describe "previousTrick" (fun () => {
    test "returns None when the bidding has not ended" (fun () => {
      let board = Board.fromPBN "W: AKQJT98765432... .AKQJT98765432.. ..AKQJT98765432. ...AKQJT98765432";
      expect (previousTrick board) |> toEqual None;
    });

    test "returns None when the first trick has not been completed" (fun () => {
      let board = Board.fromPBN "W: AK76.QJ5.T94.832 832.AK76.QJ5.T94 T94.832.AK76.QJ5 QJ5.T94.832.AK76"
      |> Board.makeBids [(Call 1 BidSuit.Spades), NoBid, NoBid, NoBid]
      |> Board.playCard (Pip.Four, Suit.Clubs)
      |> Board.playCard (Pip.Queen, Suit.Clubs)
      |> Board.playCard (Pip.Six, Suit.Clubs);
      expect (previousTrick board) |> toEqual None;
    });

    test "returns the first four cards when four cards have been played" (fun () => {
      let trick = [(Pip.Four, Suit.Clubs), (Pip.Queen, Suit.Clubs), (Pip.Six, Suit.Clubs), (Pip.Two, Suit.Clubs)];
      let board = Board.fromPBN "W: AK76.QJ5.T94.832 832.AK76.QJ5.T94 T94.832.AK76.QJ5 QJ5.T94.832.AK76"
        |> Board.makeBids [(Call 1 BidSuit.Spades), NoBid, NoBid, NoBid]
        |> Board.playTrick trick;
      expect (previousTrick board) |> toEqual (Some trick);
    });

    test "returns the first four cards when seven cards have been played" (fun () => {
      let trick = [(Pip.Four, Suit.Clubs), (Pip.Queen, Suit.Clubs), (Pip.Six, Suit.Clubs), (Pip.Two, Suit.Clubs)];
      let board = Board.fromPBN "W: AK76.QJ5.T94.832 832.AK76.QJ5.T94 T94.832.AK76.QJ5 QJ5.T94.832.AK76"
        |> Board.makeBids [(Call 1 BidSuit.Spades), NoBid, NoBid, NoBid]
        |> Board.playTrick trick
        |> Board.playTrick [(Pip.Ace, Suit.Diamonds), (Pip.Two, Suit.Diamonds), (Pip.Four, Suit.Diamonds)];
      expect (previousTrick board) |> toEqual (Some trick);
    });
  });

  describe "previousTrickWinner" (fun () => {
    test "returns None when the bidding has not ended" (fun () => {
      let board = Board.fromPBN "W: AKQJT98765432... .AKQJT98765432.. ..AKQJT98765432. ...AKQJT98765432";
      expect (previousTrickWinner board) |> toEqual None;
    });

    test "returns None when the first trick has not been completed" (fun () => {
      let board = Board.fromPBN "W: AK76.QJ5.T94.832 832.AK76.QJ5.T94 T94.832.AK76.QJ5 QJ5.T94.832.AK76"
      |> Board.makeBids [(Call 1 BidSuit.Spades), NoBid, NoBid, NoBid]
      |> Board.playCard (Pip.Four, Suit.Clubs)
      |> Board.playCard (Pip.Queen, Suit.Clubs)
      |> Board.playCard (Pip.Six, Suit.Clubs);
      expect (previousTrickWinner board) |> toEqual (None);
    });

    test "returns the winner of the previous trick in a NoTrump contract" (fun () => {
      let board = Board.fromPBN "W: AK76.QJ5.T94.832 832.AK76.QJ5.T94 T94.832.AK76.QJ5 QJ5.T94.832.AK76"
        |> Board.makeBids [(Call 1 BidSuit.NoTrumps), NoBid, NoBid, NoBid]
        |> Board.playTrick [(Pip.Four, Suit.Clubs), (Pip.Queen, Suit.Clubs), (Pip.Six, Suit.Clubs), (Pip.Two, Suit.Clubs)];
      expect (previousTrickWinner board) |> toEqual (Some Seat.East);
    });

    test "opening lead wins in NoTrumps if no-one else follows" (fun () => {
      let board = Board.fromPBN "W: AKQJT98765432... .AKQJT98765432.. ..AKQJT98765432. ...AKQJT98765432"
        |> Board.makeBids [(Call 1 BidSuit.NoTrumps), NoBid, NoBid, NoBid]
        |> Board.playTrick [(Pip.Ace, Suit.Hearts), (Pip.Ace, Suit.Diamonds), (Pip.Ace, Suit.Clubs), (Pip.Ace, Suit.Spades)];
      expect (previousTrickWinner board) |> toEqual (Some Seat.North);
    });

    test "returns the winner of the previous trick in a Trump contract" (fun () => {
      let board = Board.fromPBN "W: AK76.QJ5.T94.832 832..QJ5.AKT9764 T94.832.AK76.QJ5 QJ5.AKT9764.832."
        |> Board.makeBids [(Call 1 BidSuit.Spades), NoBid, NoBid, NoBid]
        |> Board.playTrick [(Pip.Four, Suit.Clubs), (Pip.Queen, Suit.Clubs), (Pip.Five, Suit.Spades), (Pip.Two, Suit.Clubs)];
      expect (previousTrickWinner board) |> toEqual (Some Seat.South);
    });
  });

  describe "leader" (fun () => {
    test "returns None when the bidding has not ended" (fun () => {
      let board = Board.fromPBN "W: AK76.QJ5.T94.832 832.AK76.QJ5.T94 T94.832.AK76.QJ5 QJ5.T94.832.AK76"
      |> Board.makeBids [(Call 1 BidSuit.Spades), NoBid, NoBid];
      expect (leader board) |> toEqual (None);
    });

    test "returns the player to declarer's left when the first trick has not been completed" (fun () => {
      let board = Board.fromPBN "W: AK76.QJ5.T94.832 832.AK76.QJ5.T94 T94.832.AK76.QJ5 QJ5.T94.832.AK76"
      |> Board.makeBids [(Call 1 BidSuit.Spades), NoBid, NoBid, NoBid]
      |> Board.playCard (Pip.Four, Suit.Clubs)
      |> Board.playCard (Pip.Queen, Suit.Clubs)
      |> Board.playCard (Pip.Six, Suit.Clubs);
      expect (leader board) |> toEqual (Some Seat.North);
    });

    test "returns the previous trick winner after the first trick has been completed" (fun () => {
      let board = Board.create Seat.West
      |> Board.makeBids [(Call 1 BidSuit.Spades), NoBid, NoBid, NoBid]
      |> Board.playTrick [(Pip.Four, Suit.Clubs), (Pip.Queen, Suit.Clubs), (Pip.Five, Suit.Spades), (Pip.Two, Suit.Clubs)]
      |> Board.playCard (Pip.Four, Suit.Clubs)
      |> Board.playCard (Pip.Queen, Suit.Clubs);
      expect (leader board) |> toEqual (Some Seat.South);
    });
  });
});
/*
	describe('nextPlayer', () => {
		it('returns the dealer when bidding starts', () => {
			let boardBuilder = BoardBuilder.create(Seat.West);
			expect(boardBuilder.toQuery().nextPlayer).to.equal(Seat.West);
		});

		it('returns the next player when bidding', () => {
			let boardBuilder = BoardBuilder.create(Seat.West);
			expect(boardBuilder.toQuery().nextPlayer).to.equal(Seat.West);

			boardBuilder.makeBid("4NT");
			expect(boardBuilder.toQuery().nextPlayer).to.equal(Seat.North);

			boardBuilder.makeBid("double");
			expect(boardBuilder.toQuery().nextPlayer).to.equal(Seat.East);
		});

		it('returns the leader when bidding ends', () => {
			let boardBuilder = BoardBuilder.create(Seat.West);
			expect(boardBuilder.toQuery().nextPlayer).to.equal(Seat.West);

			boardBuilder
				.makeBid("1H")
				.makeBid("no bid")
				.makeBid("no bid")
				.makeBid("no bid");

			expect(boardBuilder.toQuery().nextPlayer).to.equal(Seat.North);
		});
*/