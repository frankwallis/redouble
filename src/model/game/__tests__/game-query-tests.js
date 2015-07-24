import {GameBuilder} from '../game-builder';

describe('Game Query', () => {
	describe('currentBoard', () => {
		it('returns the last board', () => {
			let gameBuilder = GameBuilder.create();
			let game = gameBuilder.toQuery();
			expect(game.currentBoard).not.toBeDefined();

			game = gameBuilder.dealBoard().toQuery();
			expect(game.currentBoard).toBeDefined();

			let lastBoard = game.currentBoard;
			game = gameBuilder.dealBoard().toQuery();
			expect(game.currentBoard).toBeDefined();
			expect(game.currentBoard).not.toBe(lastBoard);
		});
	});

	describe('gameHasEnded', () => {

	});
});
