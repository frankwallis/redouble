import {BoardBuilder} from '../board-builder';
import {Bid, BidType} from '../../core/bid';
import {Card, Pip, Suit} from '../../core/card';
import {Seat} from '../../core/seat';
import {Deck} from '../../core/deck';

describe('Board Builder', () => {
	describe('create', () => {
		it('defaults parameters', () => {
			let board = BoardBuilder.create().toQuery();
			expect(board.dealer).to.equal(Seat.North);
			expect(board.hands[Seat.North].length).to.equal(13);
			expect(board.hands[Seat.West].length).to.equal(13);
			expect(board.bids.length).to.equal(0);
			expect(board.cards.length).to.equal(0);
		});

		it('handles parameters', () => {
			let board = BoardBuilder.create(
				Seat.West,
				Deck.fromPBN("N: 2... .2.. ..2. ...2"),
				Bid.createAll("no bid", "no bid"),
				Card.createAll("2S", "2H", "2D")
			).toQuery();
			expect(board.dealer).to.equal(Seat.West);
			expect(board.hands[Seat.North].length).to.equal(1);
			expect(board.hands[Seat.West].length).to.equal(1);
			expect(board.bids.length).to.equal(2);
			expect(board.cards.length).to.equal(3);
		});
	});

	describe('playCard', () => {
		it('adds the card', () => {
			let board = BoardBuilder.create()
				.playCard(Card.create("2H"))
				.toQuery();

			expect(board.cards.length).to.equal(1);
			expect(board.cards[0].card.pip).to.equal(Pip.Two);
			expect(board.cards[0].card.suit).to.equal(Suit.Hearts);
		});
	});

	describe('makeBid', () => {
		it('adds the bid', () => {
			let board = BoardBuilder.create()
				.playCard(Card.create("2H"))
				.makeBid("no bid")
				.toQuery();

			expect(board.bids.length).to.equal(1);
			expect(board.bids[0].type).to.equal(BidType.NoBid);
		});
	});

});
