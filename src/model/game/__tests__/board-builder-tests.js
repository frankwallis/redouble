import {BoardBuilder} from '../board-builder';
import {Bid, BidType} from '../../core/bid';
import {Card, Pip, Suit} from '../../core/card';
import {Seat} from '../../core/seat';
import {Deck} from '../../core/deck';

describe('Board Builder', () => {
	describe('create', () => {
		it('defaults parameters', () => {
			let board = BoardBuilder.create().toQuery();
			expect(board.dealer).toEqual(Seat.North);
			expect(board.hands[Seat.North].length).toEqual(13);
			expect(board.hands[Seat.West].length).toEqual(13);
			expect(board.bids.length).toEqual(0);
			expect(board.cards.length).toEqual(0);
		});

		it('handles parameters', () => {
			let board = BoardBuilder.create(
				Seat.West,
				Deck.rig(Seat.West, ["2S"], ["2H"], ["2D"], ["2C"]),
				Bid.createAll("no bid", "no bid"),
				Card.createAll("2S", "2H", "2D")
			).toQuery();
			expect(board.dealer).toEqual(Seat.West);
			expect(board.hands[Seat.North].length).toEqual(1);
			expect(board.hands[Seat.West].length).toEqual(1);
			expect(board.bids.length).toEqual(2);
			expect(board.cards.length).toEqual(3);
		});
	});

	describe('playCard', () => {
		it('adds the card', () => {
			let board = BoardBuilder.create()
				.playCard(Card.create("2H"))
				.toQuery();

			expect(board.cards.length).toEqual(1);
			expect(board.cards[0].card.pip).toEqual(Pip.Two);
			expect(board.cards[0].card.suit).toEqual(Suit.Hearts);
		});
	});

	describe('makeBid', () => {
		it('adds the bid', () => {
			let board = BoardBuilder.create()
				.playCard(Card.create("2H"))
				.makeBid(Bid.create("no bid"))
				.toQuery();

			expect(board.bids.length).toEqual(1);
			expect(board.bids[0].type).toEqual(BidType.NoBid);
		});
	});


});
