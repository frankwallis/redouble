import {BoardBuilder} from '../board-builder';
import {Bid, BidType, BidSuit} from '../../core/bid';
import {Card, Pip, Suit} from '../../core/card';
import {Seat} from '../../core/seat';
import {Deck} from '../../core/deck';

describe('Board Query', () => {

	describe('lastBid', () => {
		it('returns the last bid of any type', () => {
			let boardBuilder = BoardBuilder.create(Seat.West);
			let board = boardBuilder.toQuery();
			expect(board.lastBid).to.be.undefined;

			boardBuilder.makeBid(Bid.create("2H"));
			board = boardBuilder.toQuery();
			expect(board.lastBid).to.deep.equal({ type: BidType.Call, suit: BidSuit.Hearts, level: 2 });

			boardBuilder.makeBid(Bid.create("double"));
			board = boardBuilder.toQuery();
			expect(board.lastBid).to.deep.equal({ type: BidType.Double });

			boardBuilder.makeBid(Bid.create("no bid"));
			board = boardBuilder.toQuery();
			expect(board.lastBid).to.deep.equal({ type: BidType.NoBid });
		});
	});

	describe('lastCall', () => {
		it('returns the last call of a suit', () => {
			let boardBuilder = BoardBuilder.create(Seat.West);
			let board = boardBuilder.toQuery();
			expect(board.lastCall).to.be.undefined;

			board = boardBuilder.makeBid(Bid.create("no bid")).toQuery();
			expect(board.lastCall).to.be.undefined;

			board = boardBuilder.makeBid(Bid.create("2H")).toQuery();
			expect(board.lastCall).to.deep.equal({ type: BidType.Call, suit: BidSuit.Hearts, level: 2 });

			board = boardBuilder.makeBid(Bid.create("double")).toQuery();
			expect(board.lastCall).to.deep.equal({ type: BidType.Call, suit: BidSuit.Hearts, level: 2 });

			board = boardBuilder.makeBid(Bid.create("3S")).toQuery();
			expect(board.lastCall).to.deep.equal({ type: BidType.Call, suit: BidSuit.Spades, level: 3 });
		});
	});

	describe('lastAction', () => {
		it('returns the last bid which was not a no-bid', () => {
			let boardBuilder = BoardBuilder.create(Seat.West);
			let board = boardBuilder.toQuery();
			expect(board.lastAction).to.be.undefined;

			boardBuilder.makeBid(Bid.create("2H"));
			board = boardBuilder.toQuery();
			expect(board.lastAction).to.deep.equal({ type: BidType.Call, suit: BidSuit.Hearts, level: 2 });

			boardBuilder.makeBid(Bid.create("double"));
			board = boardBuilder.toQuery();
			expect(board.lastAction).to.deep.equal({ type: BidType.Double });

			boardBuilder.makeBid(Bid.create("no bid"));
			board = boardBuilder.toQuery();
			expect(board.lastAction).to.deep.equal({ type: BidType.Double });
		});
	});

	describe('trumpSuit', () => {
		it('returns undefined if the bidding has not ended', () => {
			let board = BoardBuilder
				.create(Seat.West)
				.toQuery();

			expect(board.trumpBid).to.be.undefined;
		});

		it('returns the suit of the bid contract', () => {
			let board = BoardBuilder
				.create(Seat.West)
				.makeBid(Bid.create("4H"))
				.makeBid(Bid.create("no bid"))
				.makeBid(Bid.create("no bid"))
				.makeBid(Bid.create("no bid"))
				.toQuery();

			expect(board.trumpSuit).to.equal(BidSuit.Hearts);
		});

		it('returns the suit of the bid contract for doubled no-trumps', () => {
			let board = BoardBuilder
				.create(Seat.West)
				.makeBid(Bid.create("4NT"))
				.makeBid(Bid.create("double"))
				.makeBid(Bid.create("no bid"))
				.makeBid(Bid.create("no bid"))
				.makeBid(Bid.create("no bid"))
				.toQuery();

			expect(board.trumpSuit).to.equal(BidSuit.NoTrumps);
		});
	});

	describe('biddingHasEnded', () => {
		it('returns false if there have not been three passes', () => {
			let boardBuilder = BoardBuilder.create(Seat.West);
			expect(boardBuilder.toQuery().biddingHasEnded).to.be.false;

			boardBuilder.makeBid(Bid.create("4NT"));
			expect(boardBuilder.toQuery().biddingHasEnded).to.be.false;

			boardBuilder.makeBid(Bid.create("double"));
			expect(boardBuilder.toQuery().biddingHasEnded).to.be.false;

			boardBuilder.makeBid(Bid.create("no bid"));
			expect(boardBuilder.toQuery().biddingHasEnded).to.be.false;

			boardBuilder.makeBid(Bid.create("no bid"));
			expect(boardBuilder.toQuery().biddingHasEnded).to.be.false;

			boardBuilder.makeBid(Bid.create("no bid"));
			expect(boardBuilder.toQuery().biddingHasEnded).to.be.true;
		});

		it('requires four no bids to throw in a hand', () => {
			let boardBuilder = BoardBuilder.create(Seat.West);

			boardBuilder.makeBid(Bid.create("no bid"));
			expect(boardBuilder.toQuery().biddingHasEnded).to.be.false;

			boardBuilder.makeBid(Bid.create("no bid"));
			expect(boardBuilder.toQuery().biddingHasEnded).to.be.false;

			boardBuilder.makeBid(Bid.create("no bid"));
			expect(boardBuilder.toQuery().biddingHasEnded).to.be.false;

			boardBuilder.makeBid(Bid.create("no bid"));
			expect(boardBuilder.toQuery().biddingHasEnded).to.be.true;
		});
	});

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
				Deck.rig(Seat.West, ["2S", "AC", "2C"], ["7S", "7H", "7C"], [ "AS", "AH", "3C"], ["3S", "4S", "5S"])
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

	describe('declarer', () => {
		it('returns the dealer when bidding starts', () => {
			let boardBuilder = BoardBuilder
				.create(Seat.West)
				.makeBid(Bid.create("no bid"))
				.makeBid(Bid.create("1H"))
				.makeBid(Bid.create("no bid"))
				.makeBid(Bid.create("2H"))
				.makeBid(Bid.create("no bid"))
				.makeBid(Bid.create("no bid"))
				.makeBid(Bid.create("no bid"));

			expect(boardBuilder.toQuery().declarer).to.equal(Seat.North);
		});
	});

	describe('declarerTricks', () => {
		it('returns the number of tricks won by declarer', () => {
			let boardBuilder = BoardBuilder.create(
				Seat.West,
				Deck.rig(Seat.West, ["2S", "AH", "2C"], ["AS", "3H", "3C"], [ "4S", "4H", "4C"], ["5S", "5H", "AC"])
			);

			boardBuilder = boardBuilder
				.makeBid(Bid.create("1H"))
				.makeBid(Bid.create("no bid"))
				.makeBid(Bid.create("no bid"))
				.makeBid(Bid.create("no bid"));
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
				.makeBid(Bid.create("1H"))
				.makeBid(Bid.create("no bid"))
				.makeBid(Bid.create("no bid"))
				.makeBid(Bid.create("no bid"));

			let board = boardBuilder.toQuery();
			expect(board.legalCards.length).to.equal(13);

			board.legalCards.forEach((card) => {
				expect(board.hands[Seat.North].some(heldcard => Card.equals(card, heldcard))).to.be.true;
			});
		});

		it('returns cards of the same suit as lead', () => {
			let boardBuilder = BoardBuilder
				.create(Seat.West)
				.makeBid(Bid.create("1H"))
				.makeBid(Bid.create("no bid"))
				.makeBid(Bid.create("no bid"))
				.makeBid(Bid.create("no bid"));

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
				Deck.rig(Seat.West, ["2S"], ["3H"], [ "4D"], ["5C"]),
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

	describe('previousTrickWinner', () => {
		it('returns undefined before play has started', () => {
			let boardBuilder = BoardBuilder.create(Seat.West);
			expect(boardBuilder.toQuery().previousTrickWinner).to.be.undefined;
		});

		it('returns undefined before a trick is completed', () => {
			let boardBuilder = BoardBuilder.create(
				Seat.West,
				Deck.rig(Seat.West, ["2S"], ["3H"], [ "4D"], ["5C"]),
				Bid.createAll("1NT", "no bid", "no bid", "no bid")
			);
			boardBuilder
				.makeBid(Bid.create("1H"))
				.makeBid(Bid.create("no bid"))
				.makeBid(Bid.create("no bid"))
				.makeBid(Bid.create("no bid"))
				.playCard(Card.create("2S"));

			expect(boardBuilder.toQuery().previousTrickWinner).to.be.undefined;
		});

		it('returns the trick winner in no trumps', () => {
			let boardBuilder = BoardBuilder.create(
				Seat.West,
				Deck.rig(Seat.West, ["2S", "2H"], ["3S", "3H"], ["9S", "9H"], ["5S", "5H"]),
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
				Deck.rig(Seat.West, ["2S", "2H"], ["3S", "3H"], ["2C", "9H"], ["5S", "5H"]),
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

			boardBuilder.makeBid(Bid.create("4NT"));
			expect(boardBuilder.toQuery().nextPlayer).to.equal(Seat.North);

			boardBuilder.makeBid(Bid.create("double"));
			expect(boardBuilder.toQuery().nextPlayer).to.equal(Seat.East);
		});

		it('returns the leader when bidding ends', () => {
			let boardBuilder = BoardBuilder.create(Seat.West);
			expect(boardBuilder.toQuery().nextPlayer).to.equal(Seat.West);

			boardBuilder
				.makeBid(Bid.create("1H"))
				.makeBid(Bid.create("no bid"))
				.makeBid(Bid.create("no bid"))
				.makeBid(Bid.create("no bid"));

			expect(boardBuilder.toQuery().nextPlayer).to.equal(Seat.North);
		});

		it('returns the trick winner when playing', () => {
			let boardBuilder = BoardBuilder.create(Seat.West);
			expect(boardBuilder.toQuery().nextPlayer).to.equal(Seat.West);

			boardBuilder
				.makeBid(Bid.create("1H"))
				.makeBid(Bid.create("no bid"))
				.makeBid(Bid.create("no bid"))
				.makeBid(Bid.create("no bid"));
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
				.makeBid(Bid.create("no bid"))
				.makeBid(Bid.create("no bid"))
				.makeBid(Bid.create("no bid"))
				.makeBid(Bid.create("no bid"));

			expect(boardBuilder.toQuery().nextPlayer).to.be.undefined;
		});
	});
});
