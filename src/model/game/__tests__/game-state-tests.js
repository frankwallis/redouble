import {Game} from '../game-state';
import {Bid, BidType, BidSuit} from '../../core/bid';
import {Card, Pip, Suit} from '../../core/card';
import {Seat} from '../../core/seat';

describe('Game State Helper', () => {
	describe('currentBoard', () => {
		it('returns the last board', () => {
			let game = new Game();
			expect(game.currentBoard).not.toBeDefined();

			game = game.dealBoard();
			expect(game.currentBoard).toBeDefined();

			let lastBoard = game.currentBoard;
			game = game.dealBoard();
			expect(game.currentBoard).toBeDefined();
			expect(game.currentBoard).not.toBe(lastBoard);
		});
	});

	describe('dealBoard', () => {

	});

	describe('playCard', () => {
		it('adds the card', () => {
			let game = new Game()
				.newBoard()
				.playCard(Card.create("2H"));
			
			expect(game.currentBoard.cards.length).toEqual(1);
			expect(game.currentBoard.cards[0].card.pip).toEqual(Pip.Two);
			expect(game.currentBoard.cards[0].card.suit).toEqual(Suit.Hearts);
		});
	});

	describe('makeBid', () => {
		it('adds the bid', () => {
			let game = new Game()
				.newBoard()
				.makeBid(Bid.create("no bid"));
			
			expect(game.currentBoard.bids.length).toEqual(1);
			expect(game.currentBoard.bids[0].type).toEqual(BidType.NoBid);
		});
	});

	describe('gameHasEnded', () => {

	});

});
