import {GameBuilder} from '../game-builder';
import {Bid, BidType} from '../../core/bid';
import {Card, Pip, Suit} from '../../core/card';

describe('Game Builder', () => {
	describe('dealBoard', () => {

	});

	describe('playCard', () => {
		it('adds the card', () => {
			let game = GameBuilder
				.create()
				.newBoard()
				.playCard(Card.create("2H"))
				.toQuery();

			expect(game.currentBoard.cards.length).to.equal(1);
			expect(game.currentBoard.cards[0].card.pip).to.equal(Pip.Two);
			expect(game.currentBoard.cards[0].card.suit).to.equal(Suit.Hearts);
		});
	});

	describe('makeBid', () => {
		it('adds the bid', () => {
			let game = GameBuilder
				.create()
				.newBoard()
				.makeBid(Bid.create("no bid"))
				.toQuery();

			expect(game.currentBoard.bids.length).to.equal(1);
			expect(game.currentBoard.bids[0].type).to.equal(BidType.NoBid);
		});
	});

});
