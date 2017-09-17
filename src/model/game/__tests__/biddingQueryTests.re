open Jest;
open Expect;
open Board;

describe "BiddingQuery" (fun () => {
  open Bid;

  describe "lastBid" (fun () => {
    test "returns None whe no-one has bid" (fun () => {
      let board = Board.create Seat.West;
      expect (lastBid board) |> toEqual None;
    });

    test "returns Call" (fun () => {
      let board = Board.create Seat.West
        |> Board.makeBid (Call 2 BidSuit.Hearts);
      expect (lastBid board) |> toEqual (Some { seat: Seat.West, bid: (Call 2 BidSuit.Hearts) });
    });

    test "returns Double" (fun () => {
      let board = Board.create Seat.West
        |> Board.makeBid (Call 2 BidSuit.Hearts)
        |> Board.makeBid Double;
      expect (lastBid board) |> toEqual (Some { seat: Seat.North, bid: Double });
    });

    test "returns Redouble" (fun () => {
      let board = Board.create Seat.West
        |> Board.makeBid (Call 2 BidSuit.Hearts)
        |> Board.makeBid Double
        |> Board.makeBid NoBid;
      expect (lastBid board) |> toEqual (Some { seat: Seat.East, bid: NoBid });
    });
  });

  describe "lastCall" (fun () => {
    test "returns None when no-one has bid" (fun () => {
      let board = Board.create Seat.West;
      expect (lastCall board) |> toEqual None;
    });

    test "returns None after a NoBid" (fun () => {
      let board = Board.create Seat.West
        |> Board.makeBid NoBid;
      expect (lastCall board) |> toEqual None;
    });

    test "returns Call" (fun () => {
      let board = Board.create Seat.West
        |> Board.makeBid NoBid
        |> Board.makeBid (Call 2 BidSuit.Hearts);
      expect (lastCall board) |> toEqual (Some { seat: Seat.North, bid: (Call 2 BidSuit.Hearts) });
    });

    test "returns Call after a Double" (fun () => {
      let board = Board.create Seat.West
        |> Board.makeBid NoBid
        |> Board.makeBid (Call 2 BidSuit.Hearts)
        |> Board.makeBid Double;
      expect (lastCall board) |> toEqual (Some { seat: Seat.North, bid: (Call 2 BidSuit.Hearts) });
    });

    test "returns last Call which was made" (fun () => {
      let board = Board.create Seat.West
        |> Board.makeBid NoBid
        |> Board.makeBid (Call 2 BidSuit.Hearts)
        |> Board.makeBid Double
        |> Board.makeBid (Call 3 BidSuit.Spades);
      expect (lastCall board) |> toEqual (Some { seat: Seat.South, bid: (Call 3 BidSuit.Spades) });
    });
  });

  describe "lastAction" (fun () => {
    test "returns None before the bidding starts" (fun () => {
      let board = Board.create Seat.West;
      expect (lastAction board) |> toEqual None;
    });

    test "returns None after a NoBid" (fun () => {
      let board = Board.create Seat.West
        |> Board.makeBid NoBid;
      expect (lastAction board) |> toEqual None;
    });

    test "returns Call" (fun () => {
      let board = Board.create Seat.West
        |> Board.makeBid NoBid
        |> Board.makeBid (Call 2 BidSuit.Hearts);
      expect (lastAction board) |> toEqual (Some { seat: Seat.North, bid: (Call 2 BidSuit.Hearts) });
    });

    test "returns Double" (fun () => {
      let board = Board.create Seat.West
        |> Board.makeBid NoBid
        |> Board.makeBid (Call 2 BidSuit.Hearts)
        |> Board.makeBid Double;
      expect (lastAction board) |> toEqual (Some { seat: Seat.East, bid: Double });
    });

    test "returns Call after a Double" (fun () => {
      let board = Board.create Seat.West
        |> Board.makeBid NoBid
        |> Board.makeBid (Call 2 BidSuit.Hearts)
        |> Board.makeBid Double
        |> Board.makeBid (Call 3 BidSuit.Spades);
      expect (lastAction board) |> toEqual (Some { seat: Seat.South, bid: (Call 3 BidSuit.Spades) });
    });
  });

  describe "biddingHasEnded" (fun () => {
    test "returns false when there has been no bidding" (fun () => {
      let board = Board.create Seat.West;
      expect (biddingHasEnded board) |> toEqual false;
    });

    test "returns false when there have only been 2 NoBids after a Call" (fun () => {
      let board = Board.create Seat.West
        |> Board.makeBid (Call 2 BidSuit.Hearts)
        |> Board.makeBid NoBid
        |> Board.makeBid NoBid;
      expect (biddingHasEnded board) |> toEqual false;
    });

    test "returns true when there have been 3 NoBids after a Call" (fun () => {
      let board = Board.create Seat.West
        |> Board.makeBid (Call 2 BidSuit.Hearts)
        |> Board.makeBid NoBid
        |> Board.makeBid NoBid
        |> Board.makeBid NoBid;
      expect (biddingHasEnded board) |> toEqual true;
    });

    test "returns false when there have been 3 NoBids initially" (fun () => {
      let board = Board.create Seat.West
        |> Board.makeBid NoBid
        |> Board.makeBid NoBid
        |> Board.makeBid NoBid;
      expect (biddingHasEnded board) |> toEqual false;
    });

    test "returns true when there are four NoBids on the first round" (fun () => {
      let board = Board.create Seat.West
        |> Board.makeBid NoBid
        |> Board.makeBid NoBid
        |> Board.makeBid NoBid
        |> Board.makeBid NoBid;
      expect (biddingHasEnded board) |> toEqual true;
    });
  });

  describe "trumpSuit" (fun () => {
    test "returns None when bidding has not ended" (fun () => {
      let board = Board.create Seat.West
        |> Board.makeBid (Call 2 BidSuit.Hearts)
        |> Board.makeBid NoBid
        |> Board.makeBid NoBid;

      expect (trumpSuit board) |> toEqual None;
    });

    test "returns None when hand thrown in" (fun () => {
      let board = Board.create Seat.West
        |> Board.makeBid NoBid
        |> Board.makeBid NoBid
        |> Board.makeBid NoBid
        |> Board.makeBid NoBid;

      expect (trumpSuit board) |> toEqual None;
    });

    test "returns the suit of the bid contract" (fun () => {
      let board = Board.create Seat.West
        |> Board.makeBid (Call 2 BidSuit.Hearts)
        |> Board.makeBid (Call 3 BidSuit.Diamonds)
        |> Board.makeBid NoBid
        |> Board.makeBid NoBid
        |> Board.makeBid NoBid;

      expect (trumpSuit board) |> toEqual (Some BidSuit.Diamonds);
    });

    test "returns the suit of the bid contract for doubled NoTrump" (fun () => {
      let board = Board.create Seat.West
        |> Board.makeBid (Call 2 BidSuit.NoTrumps)
        |> Board.makeBid Double
        |> Board.makeBid NoBid
        |> Board.makeBid NoBid
        |> Board.makeBid NoBid;

      expect (trumpSuit board) |> toEqual (Some BidSuit.NoTrumps);
    });
  });

  describe "declarer" (fun () => {
    test "returns None when bidding has not ended" (fun () => {
      let board = Board.create Seat.West
        |> Board.makeBid (Call 2 BidSuit.Hearts)
        |> Board.makeBid NoBid
        |> Board.makeBid NoBid;

      expect (declarer board) |> toEqual None;
    });

    test "returns None when hand thrown in" (fun () => {
      let board = Board.create Seat.West
        |> Board.makeBid NoBid
        |> Board.makeBid NoBid
        |> Board.makeBid NoBid
        |> Board.makeBid NoBid;

      expect (declarer board) |> toEqual None;
    });

    test "returns the person who bid the contract suit first" (fun () => {
      let board = Board.create Seat.West
        |> Board.makeBid NoBid
        |> Board.makeBid (Call 1 BidSuit.Hearts)
        |> Board.makeBid NoBid
        |> Board.makeBid (Call 3 BidSuit.Hearts)
        |> Board.makeBid NoBid
        |> Board.makeBid NoBid
        |> Board.makeBid NoBid;

      expect (declarer board) |> toEqual (Some Seat.North);
    });

    test "returns the person on declaring team who bid the contract suit first" (fun () => {
      let board = Board.create Seat.West
        |> Board.makeBid (Call 1 BidSuit.Hearts)
        |> Board.makeBid (Call 2 BidSuit.Hearts)
        |> Board.makeBid NoBid
        |> Board.makeBid (Call 3 BidSuit.Hearts)
        |> Board.makeBid NoBid
        |> Board.makeBid NoBid
        |> Board.makeBid NoBid;

      expect (declarer board) |> toEqual (Some Seat.North);
    });
  });
});

/*
describe('Board Query', () => {
	describe('currentTrick', () => {
		it('returns the current trick', () => {
			let boardBuilder = BoardBuilder.create(Seat.West);
			expect(boardBuilder.toQuery().currentTrick).to.deep.equal([]);

			boardBuilder.playCard(Card.create("2H"));
			expect(boardBuilder.toQuery().currentTrick.length).to.equal(1);

			boardBuilder.playCard(Card.create("3H"));
			expect(boardBuilder.toQuery().currentTrick.length).to.equal(2);
			expect(boardBuilder.toQuery().currentTrick[0].card).to.deep.equal({ suit: Suit.Hearts, pip: Pip.Two });
			expect(boardBuilder.toQuery().currentTrick[1].card).to.deep.equal({ suit: Suit.Hearts, pip: Pip.Three });

			boardBuilder
				.playCard(Card.create("4H"))
				.playCard(Card.create("5H"));
			expect(boardBuilder.toQuery().currentTrick.length).to.equal(4);

			boardBuilder.playCard(Card.create("AS"));
			expect(boardBuilder.toQuery().currentTrick.length).to.equal(1);
			expect(boardBuilder.toQuery().currentTrick[0].card).to.deep.equal({ suit: Suit.Spades, pip: Pip.Ace });
		});
	});

	describe('playHasEnded', () => {
		it('returns true after all the cards have been played', () => {
			let boardBuilder = BoardBuilder.create(
				Seat.West,
				Deck.fromPBN("N: 2...A2 7.7..7 A.A..3 456...")
			);

			for(let idx = 0; idx < 3; idx ++) {
				Seat.all().forEach(seat => { //eslint-disable-line no-loop-func
					let board = boardBuilder.toQuery();
					expect(board.playHasEnded).to.be.false;
					boardBuilder.playCard(board.hands[seat][idx]);
				});
			}
			expect(boardBuilder.toQuery().playHasEnded).to.be.true;
		});
	});


	describe('declarerTricks', () => {
		it('returns the number of tricks won by declarer', () => {
			let boardBuilder = BoardBuilder.create(
				Seat.West,
				Deck.fromPBN("N: 2...A2 7.7..7 A.A..3 456..."),
			);

			boardBuilder = boardBuilder
				.makeBid("1H")
				.makeBid("no bid")
				.makeBid("no bid")
				.makeBid("no bid");
			expect(boardBuilder.toQuery().declarerTricks).to.equal(0);

			boardBuilder = boardBuilder
				.playCard(Card.create("2C"))
				.playCard(Card.create("3C"))
				.playCard(Card.create("4C"))
				.playCard(Card.create("AC"));
			expect(boardBuilder.toQuery().declarerTricks).to.equal(1);

			boardBuilder = boardBuilder
				.playCard(Card.create("5H"))
				.playCard(Card.create("AH"))
				.playCard(Card.create("3H"))
				.playCard(Card.create("4H"));
			expect(boardBuilder.toQuery().declarerTricks).to.equal(1);

			boardBuilder = boardBuilder
				.playCard(Card.create("2S"))
				.playCard(Card.create("AS"))
				.playCard(Card.create("4S"))
				.playCard(Card.create("5S"));
			expect(boardBuilder.toQuery().declarerTricks).to.equal(2);
		});
	});

	describe('legalCards', () => {
		it('returns all available cards for leader', () => {
			let boardBuilder = BoardBuilder
				.create(Seat.West)
				.makeBid("1H")
				.makeBid("no bid")
				.makeBid("no bid")
				.makeBid("no bid");

			let board = boardBuilder.toQuery();
			expect(board.legalCards.length).to.equal(13);

			board.legalCards.forEach((card) => {
				expect(board.hands[Seat.North].Some (heldcard => Card.equals(card, heldcard))).to.be.true;
			});
		});

		it('returns cards of the same suit as lead', () => {
			let boardBuilder = BoardBuilder
				.create(Seat.West)
				.makeBid("1H")
				.makeBid("no bid")
				.makeBid("no bid")
				.makeBid("no bid");

			let lead = boardBuilder.toQuery().legalCards[0];
			boardBuilder.playCard(lead);

			let board = boardBuilder.toQuery();
			board.legalCards.forEach((card) => {
				expect(card.suit).to.equal(lead.suit);
			});

			expect(board.hands[Seat.East].reduce((count, card) => card.suit === lead.suit ? count + 1 : count, 0)).to.equal(board.legalCards.length);
		});

		it('returns all available cards when void', () => {
			let boardBuilder = BoardBuilder.create(
				Seat.West,
				Deck.fromPBN("N: 2... .3.. ..4. ...5"),
				Bid.createAll("no bid", "no bid", "1NT", "no bid", "no bid", "no bid")
			);
			let board = boardBuilder.toQuery();
			expect(board.legalCards.length).to.equal(1);
			board = boardBuilder.playCard(board.legalCards[0]).toQuery();
			expect(board.legalCards.length).to.equal(1);
			board = boardBuilder.playCard(board.legalCards[0]).toQuery();
			expect(board.legalCards.length).to.equal(1);
			board = boardBuilder.playCard(board.legalCards[0]).toQuery();
			expect(board.legalCards.length).to.equal(1);
			board = boardBuilder.playCard(board.legalCards[0]).toQuery();
			expect(board.legalCards.length).to.equal(0);
		});
	});

	describe('legalCards', () => {
		it('returns all available bids when no bid has been made', () => {
			let boardBuilder = BoardBuilder
				.create(Seat.West);

			let board = boardBuilder.toQuery();
			expect(board.getLegalBids()).to.have.length.of((7 * 5) + 1);
		});

		it('only allows bids higher than the current contract', () => {
			let boardBuilder = BoardBuilder
				.create(Seat.West)
				.makeBid("4NT")
				.makeBid("no bid");

			let board = boardBuilder.toQuery();
			let bids = board.getLegalBids();

			expect(bids).to.have.length.of((3 * 5) + 1);
		});

		it('only allows double when opponent has bid', () => {
			let boardBuilder = BoardBuilder
				.create(Seat.West)
				.makeBid("7NT");

			let board = boardBuilder.toQuery();
			let bids = board.getLegalBids();

			expect(bids).to.have.length.of(2);
			expect(bids[0].type).to.equal(BidType.NoBid);
			expect(bids[1].type).to.equal(BidType.Double);

			boardBuilder.makeBid("no bid");
			board = boardBuilder.toQuery();
			bids = board.getLegalBids();

			expect(bids).to.have.length.of(1);
			expect(bids[0].type).to.equal(BidType.NoBid);
		});

		it('only allows redouble when contract is doubled', () => {
			let boardBuilder = BoardBuilder
				.create(Seat.West)
				.makeBid("7NT")
				.makeBid("double");

			let board = boardBuilder.toQuery();
			let bids = board.getLegalBids();

			expect(bids).to.have.length.of(2);
			expect(bids[0].type).to.equal(BidType.NoBid);
			expect(bids[1].type).to.equal(BidType.Redouble);

			boardBuilder.makeBid("no bid");
			board = boardBuilder.toQuery();
			bids = board.getLegalBids();

			expect(bids).to.have.length.of(1);
			expect(bids[0].type).to.equal(BidType.NoBid);
		});
	});

	describe('previousTrickWinner', () => {
		it('returns undefined before play has started', () => {
			let boardBuilder = BoardBuilder.create(Seat.West);
			expect(boardBuilder.toQuery().previousTrickWinner).to.be.undefined;
		});

		it('returns undefined before a trick is completed', () => {
			let boardBuilder = BoardBuilder.create(
				Seat.West,
				Deck.fromPBN("N: 2... .3.. ..4. ...5"),
				Bid.createAll("1NT", "no bid", "no bid", "no bid")
			);
			boardBuilder
				.makeBid("1H")
				.makeBid("no bid")
				.makeBid("no bid")
				.makeBid("no bid")
				.playCard(Card.create("2S"));

			expect(boardBuilder.toQuery().previousTrickWinner).to.be.undefined;
		});

		it('returns the trick winner in no trumps', () => {
			let boardBuilder = BoardBuilder.create(
				Seat.West,
				Deck.fromPBN("N: 2.2.. 3.3.. 9.9.. 5.5.."),
				Bid.createAll("1NT", "no bid", "no bid", "no bid")
			);
			boardBuilder
				.playCard(Card.create("2S"))
				.playCard(Card.create("3S"))
				.playCard(Card.create("9S"))
				.playCard(Card.create("5S"))
				.playCard(Card.create("9H"));

			expect(boardBuilder.toQuery().previousTrickWinner).to.equal(Seat.South);
		});

		it('returns the trick winner in trumps', () => {
			let boardBuilder = BoardBuilder.create(
				Seat.West,
				Deck.fromPBN("N: 2.2.. 3.3.. .9..2 5.5.."),
				Bid.createAll("1C", "no bid", "no bid", "no bid")
			);
			boardBuilder
				.playCard(Card.create("2S"))
				.playCard(Card.create("3S"))
				.playCard(Card.create("2C"))
				.playCard(Card.create("5H"))
				.playCard(Card.create("9H"));

			expect(boardBuilder.toQuery().previousTrickWinner).to.equal(Seat.South);
		});
	});

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

		it('returns the trick winner when playing', () => {
			let boardBuilder = BoardBuilder.create(Seat.West);
			expect(boardBuilder.toQuery().nextPlayer).to.equal(Seat.West);

			boardBuilder
				.makeBid("1H")
				.makeBid("no bid")
				.makeBid("no bid")
				.makeBid("no bid");
			expect(boardBuilder.toQuery().nextPlayer).to.equal(Seat.North);

			boardBuilder
				.playCard(Card.create("2H"))
				.playCard(Card.create("3H"))
				.playCard(Card.create("4H"))
				.playCard(Card.create("5H"));

			expect(boardBuilder.toQuery().nextPlayer).to.equal(Seat.West);

			boardBuilder.playCard(Card.create("6H"));
			expect(boardBuilder.toQuery().nextPlayer).to.equal(Seat.North);
		});

		it('returns undefined if the hand is passed out', () => {
			let boardBuilder = BoardBuilder.create(Seat.West);

			boardBuilder
				.makeBid("no bid")
				.makeBid("no bid")
				.makeBid("no bid")
				.makeBid("no bid");

			expect(boardBuilder.toQuery().nextPlayer).to.be.undefined;
		});
	});
});
*/

