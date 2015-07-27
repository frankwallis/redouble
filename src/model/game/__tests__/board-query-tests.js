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
			expect(board.lastBid).toBeUndefined();

			boardBuilder.makeBid(Bid.create("2H"));
			board = boardBuilder.toQuery();
			expect(board.lastBid).toEqual({ type: BidType.Call, suit: BidSuit.Hearts, level: 2 });

			boardBuilder.makeBid(Bid.create("double"));
			board = boardBuilder.toQuery();
			expect(board.lastBid).toEqual({ type: BidType.Double });

			boardBuilder.makeBid(Bid.create("no bid"));
			board = boardBuilder.toQuery();
			expect(board.lastBid).toEqual({ type: BidType.NoBid });
		});
	});

	describe('lastCall', () => {
		it('returns the last call of a suit', () => {
			let boardBuilder = BoardBuilder.create(Seat.West);
			let board = boardBuilder.toQuery();
			expect(board.lastCall).toBeUndefined();

			board = boardBuilder.makeBid(Bid.create("no bid")).toQuery();
			expect(board.lastCall).toBeUndefined();

			board = boardBuilder.makeBid(Bid.create("2H")).toQuery();
			expect(board.lastCall).toEqual({ type: BidType.Call, suit: BidSuit.Hearts, level: 2 });

			board = boardBuilder.makeBid(Bid.create("double")).toQuery();
			expect(board.lastCall).toEqual({ type: BidType.Call, suit: BidSuit.Hearts, level: 2 });

			board = boardBuilder.makeBid(Bid.create("3S")).toQuery();
			expect(board.lastCall).toEqual({ type: BidType.Call, suit: BidSuit.Spades, level: 3 });
		});
	});

	describe('lastAction', () => {
		it('returns the last bid which was not a no-bid', () => {
			let boardBuilder = BoardBuilder.create(Seat.West);
			let board = boardBuilder.toQuery();
			expect(board.lastAction).toBeUndefined();

			boardBuilder.makeBid(Bid.create("2H"));
			board = boardBuilder.toQuery();
			expect(board.lastAction).toEqual({ type: BidType.Call, suit: BidSuit.Hearts, level: 2 });

			boardBuilder.makeBid(Bid.create("double"));
			board = boardBuilder.toQuery();
			expect(board.lastAction).toEqual({ type: BidType.Double });

			boardBuilder.makeBid(Bid.create("no bid"));
			board = boardBuilder.toQuery();
			expect(board.lastAction).toEqual({ type: BidType.Double });
		});
	});

	describe('trumpSuit', () => {
		it('returns undefined if the bidding has not ended', () => {
			let board = BoardBuilder
				.create(Seat.West)
				.toQuery();

			expect(board.trumpBid).toBeUndefined();
		});

		it('returns the suit of the bid contract', () => {
			let board = BoardBuilder
				.create(Seat.West)
				.makeBid(Bid.create("4H"))
				.makeBid(Bid.create("no bid"))
				.makeBid(Bid.create("no bid"))
				.makeBid(Bid.create("no bid"))
				.toQuery();

			expect(board.trumpSuit).toBe(BidSuit.Hearts);
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

			expect(board.trumpSuit).toBe(BidSuit.NoTrumps);
		});
	});

	describe('biddingHasEnded', () => {
		it('returns false if there have not been three passes', () => {
			let boardBuilder = BoardBuilder.create(Seat.West);
			expect(boardBuilder.toQuery().biddingHasEnded).toBeFalsy();

			boardBuilder.makeBid(Bid.create("4NT"));
			expect(boardBuilder.toQuery().biddingHasEnded).toBeFalsy();

			boardBuilder.makeBid(Bid.create("double"));
			expect(boardBuilder.toQuery().biddingHasEnded).toBeFalsy();

			boardBuilder.makeBid(Bid.create("no bid"));
			expect(boardBuilder.toQuery().biddingHasEnded).toBeFalsy();

			boardBuilder.makeBid(Bid.create("no bid"));
			expect(boardBuilder.toQuery().biddingHasEnded).toBeFalsy();

			boardBuilder.makeBid(Bid.create("no bid"));
			expect(boardBuilder.toQuery().biddingHasEnded).toBeTruthy();
		});

		it('requires four no bids to throw in a hand', () => {
			let boardBuilder = BoardBuilder.create(Seat.West);

			boardBuilder.makeBid(Bid.create("no bid"));
			expect(boardBuilder.toQuery().biddingHasEnded).toBeFalsy();

			boardBuilder.makeBid(Bid.create("no bid"));
			expect(boardBuilder.toQuery().biddingHasEnded).toBeFalsy();

			boardBuilder.makeBid(Bid.create("no bid"));
			expect(boardBuilder.toQuery().biddingHasEnded).toBeFalsy();

			boardBuilder.makeBid(Bid.create("no bid"));
			expect(boardBuilder.toQuery().biddingHasEnded).toBeTruthy();
		});
	});

	describe('currentTrick', () => {
		it('returns the current trick', () => {
			let boardBuilder = BoardBuilder.create(Seat.West);
			expect(boardBuilder.toQuery().currentTrick).toEqual([]);

			boardBuilder.playCard(Card.create("2H"));
			expect(boardBuilder.toQuery().currentTrick.length).toBe(1);

			boardBuilder.playCard(Card.create("3H"));
			expect(boardBuilder.toQuery().currentTrick.length).toBe(2);
			expect(boardBuilder.toQuery().currentTrick[0].card).toEqual({ suit: Suit.Hearts, pip: Pip.Two });
			expect(boardBuilder.toQuery().currentTrick[1].card).toEqual({ suit: Suit.Hearts, pip: Pip.Three });

			boardBuilder
				.playCard(Card.create("4H"))
				.playCard(Card.create("5H"));
			expect(boardBuilder.toQuery().currentTrick.length).toBe(4);

			boardBuilder.playCard(Card.create("AS"));
			expect(boardBuilder.toQuery().currentTrick.length).toBe(1);
			expect(boardBuilder.toQuery().currentTrick[0].card).toEqual({ suit: Suit.Spades, pip: Pip.Ace });
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
					expect(board.playHasEnded).toBeFalsy();
					boardBuilder.playCard(board.hands[seat][idx]);
				});
			}
			expect(boardBuilder.toQuery().playHasEnded).toBeTruthy();
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

			expect(boardBuilder.toQuery().declarer).toEqual(Seat.North);
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
			expect(boardBuilder.toQuery().declarerTricks).toEqual(0);

			boardBuilder = boardBuilder
				.playCard(Card.create("2C"))
				.playCard(Card.create("3C"))
				.playCard(Card.create("4C"))
				.playCard(Card.create("AC"));
			expect(boardBuilder.toQuery().declarerTricks).toEqual(1);

			boardBuilder = boardBuilder
				.playCard(Card.create("5H"))
				.playCard(Card.create("AH"))
				.playCard(Card.create("3H"))
				.playCard(Card.create("4H"));
			expect(boardBuilder.toQuery().declarerTricks).toEqual(1);

			boardBuilder = boardBuilder
				.playCard(Card.create("2S"))
				.playCard(Card.create("AS"))
				.playCard(Card.create("4S"))
				.playCard(Card.create("5S"));
			expect(boardBuilder.toQuery().declarerTricks).toEqual(2);
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
			expect(board.legalCards.length).toBe(13);

			board.legalCards.forEach((card) => {
				expect(board.hands[Seat.North].some(heldcard => Card.equals(card, heldcard))).toBeTruthy();
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
				expect(card.suit).toEqual(lead.suit);
			});

			expect(board.hands[Seat.East].reduce((count, card) => card.suit === lead.suit ? count + 1 : count, 0)).toBe(board.legalCards.length);
		});

		it('returns all available cards when void', () => {
			let boardBuilder = BoardBuilder.create(
				Seat.West,
				Deck.rig(Seat.West, ["2S"], ["3H"], [ "4D"], ["5C"]),
				Bid.createAll("no bid", "no bid", "1NT", "no bid", "no bid", "no bid")
			);
			let board = boardBuilder.toQuery();
			expect(board.legalCards.length).toBe(1);
			board = boardBuilder.playCard(board.legalCards[0]).toQuery();
			expect(board.legalCards.length).toBe(1);
			board = boardBuilder.playCard(board.legalCards[0]).toQuery();
			expect(board.legalCards.length).toBe(1);
			board = boardBuilder.playCard(board.legalCards[0]).toQuery();
			expect(board.legalCards.length).toBe(1);
			board = boardBuilder.playCard(board.legalCards[0]).toQuery();
			expect(board.legalCards.length).toBe(0);
		});
	});

	describe('nextPlayer', () => {
		it('returns the dealer when bidding starts', () => {
			let boardBuilder = BoardBuilder.create(Seat.West);
			expect(boardBuilder.toQuery().nextPlayer).toEqual(Seat.West);
		});

		it('returns the next player when bidding', () => {
			let boardBuilder = BoardBuilder.create(Seat.West);
			expect(boardBuilder.toQuery().nextPlayer).toEqual(Seat.West);

			boardBuilder.makeBid(Bid.create("4NT"));
			expect(boardBuilder.toQuery().nextPlayer).toEqual(Seat.North);

			boardBuilder.makeBid(Bid.create("double"));
			expect(boardBuilder.toQuery().nextPlayer).toEqual(Seat.East);
		});

		it('returns the leader when bidding ends', () => {
			let boardBuilder = BoardBuilder.create(Seat.West);
			expect(boardBuilder.toQuery().nextPlayer).toEqual(Seat.West);

			boardBuilder
				.makeBid(Bid.create("1H"))
				.makeBid(Bid.create("no bid"))
				.makeBid(Bid.create("no bid"))
				.makeBid(Bid.create("no bid"));

			expect(boardBuilder.toQuery().nextPlayer).toEqual(Seat.North);
		});

		it('returns the trick winner when playing', () => {
			let boardBuilder = BoardBuilder.create(Seat.West);
			expect(boardBuilder.toQuery().nextPlayer).toEqual(Seat.West);

			boardBuilder
				.makeBid(Bid.create("1H"))
				.makeBid(Bid.create("no bid"))
				.makeBid(Bid.create("no bid"))
				.makeBid(Bid.create("no bid"));
			expect(boardBuilder.toQuery().nextPlayer).toEqual(Seat.North);

			boardBuilder
				.playCard(Card.create("2H"))
				.playCard(Card.create("3H"))
				.playCard(Card.create("4H"))
				.playCard(Card.create("5H"));

			expect(boardBuilder.toQuery().nextPlayer).toEqual(Seat.West);

			boardBuilder.playCard(Card.create("6H"));
			expect(boardBuilder.toQuery().nextPlayer).toEqual(Seat.North);
		});

		it('returns undefined if the hand is passed out', () => {
			let boardBuilder = BoardBuilder.create(Seat.West);

			boardBuilder
				.makeBid(Bid.create("no bid"))
				.makeBid(Bid.create("no bid"))
				.makeBid(Bid.create("no bid"))
				.makeBid(Bid.create("no bid"));

			expect(boardBuilder.toQuery().nextPlayer).toBeUndefined();
		});
	});
});
