import {GameBuilder} from '../game-builder';

describe('Game Query', () => {
	describe('currentBoard', () => {
		it('returns the last board', () => {
			let gameBuilder = GameBuilder.create();
			let game = gameBuilder.toQuery();
			expect(game.currentBoard).to.be.undefined;

			game = gameBuilder.dealBoard().toQuery();
			expect(game.currentBoard).to.not.be.undefined;

			let lastBoard = game.currentBoard;
			game = gameBuilder.dealBoard().toQuery();
			expect(game.currentBoard).to.not.be.undefined;
			expect(game.currentBoard).not.to.equal(lastBoard);
		});
	});

	describe('gameHasEnded', () => {

	});
});
