import {GameHistory} from '../game-history';

import {Game} from '../game-state';
import {Bid} from '../../core/bid';
import {Card} from '../../core/card';

describe('Game History', () => {
	let gameHistory = null;

	beforeEach(() => {
		gameHistory = new GameHistory();
	});

	describe('push/current', () => {
		it('adds a game', () => {
			gameHistory = gameHistory.push(1);
			expect(gameHistory.currentGameState()).toEqual(1);
			gameHistory = gameHistory.push(2);
			expect(gameHistory.currentGameState()).toEqual(2);
		});

		it('clears forward history', () => {
			gameHistory = gameHistory.push(1);
			expect(gameHistory.currentGameState()).toEqual(1);
			gameHistory = gameHistory.push(2);
			expect(gameHistory.currentGameState()).toEqual(2);
			gameHistory = gameHistory.back();
			gameHistory = gameHistory.push(3);
			expect(gameHistory.currentGameState()).toEqual(3);
			gameHistory = gameHistory.back();
			expect(gameHistory.currentGameState()).toEqual(1);
		});
	});

	describe('back', () => {
		it('moves back to previous state', () => {
			gameHistory = gameHistory.push(1);
			gameHistory = gameHistory.push(2);
			gameHistory = gameHistory.back();
			expect(gameHistory.currentGameState()).toEqual(1);
		});
	});

	describe('canBack', () => {
		it('only allowed when game has cached states', () => {
			expect(gameHistory.canBack()).toBeFalsy();
			gameHistory = gameHistory.push(1);
			expect(gameHistory.canBack()).toBeFalsy();
			gameHistory = gameHistory.push(2);
			expect(gameHistory.canBack()).toBeTruthy();
			gameHistory = gameHistory.back();
			expect(gameHistory.canBack()).toBeFalsy();
		});
	});

	describe('forward', () => {
		it('moves forward to previously created state', () => {
			gameHistory = gameHistory.push(1);
			gameHistory = gameHistory.push(2);
			gameHistory = gameHistory.push(3);
			gameHistory = gameHistory.back();
			gameHistory = gameHistory.back();
			expect(gameHistory.currentGameState()).toEqual(1);
			gameHistory = gameHistory.forward();
			expect(gameHistory.currentGameState()).toEqual(2);
		});
	});

	describe('canForward', () => {
		it('only allowed when game has cached states', () => {
			expect(gameHistory.canForward()).toBeFalsy();
			gameHistory = gameHistory.push(1);
			gameHistory = gameHistory.push(2);
			expect(gameHistory.canForward()).toBeFalsy();
			gameHistory = gameHistory.back();
			expect(gameHistory.canForward()).toBeTruthy();
			gameHistory = gameHistory.forward();
			expect(gameHistory.canForward()).toBeFalsy();
		});
	});

	describe('jumpBack', () => {
		it('moves to start of play when play has started', () => {
			let game = new Game().newBoard();
			gameHistory = gameHistory.push(game.getState());
			game = game.makeBid(Bid.create("1H"));
			gameHistory = gameHistory.push(game.getState());
			game = game.makeBid(Bid.create("no bid"));
			gameHistory = gameHistory.push(game.getState());
			game = game.makeBid(Bid.create("no bid"));
			gameHistory = gameHistory.push(game.getState());
			game = game.makeBid(Bid.create("no bid"));
			gameHistory = gameHistory.push(game.getState());

			game = game.makeBid(Card.create("7H"));
			gameHistory = gameHistory.push(game.getState());

			gameHistory = gameHistory.jumpBack();
			game = new Game(gameHistory.currentGameState());
			expect(game.currentBoard.biddingHasEnded).toBeTruthy();
		});

		it('moves to start of bidding when play has not started', () => {
			let game = new Game().newBoard();
			gameHistory = gameHistory.push(game.getState());
			game = game.makeBid(Bid.create("1H"));
			gameHistory = gameHistory.push(game.getState());
			game = game.makeBid(Bid.create("no bid"));
			gameHistory = gameHistory.push(game.getState());
			game = game.makeBid(Bid.create("no bid"));
			gameHistory = gameHistory.push(game.getState());
			game = game.makeBid(Bid.create("no bid"));
			gameHistory = gameHistory.push(game.getState());

			gameHistory = gameHistory.jumpBack();
			game = new Game(gameHistory.currentGameState());
			expect(game.currentBoard.biddingHasEnded).toBeFalsy();
		});
	});

	describe('canJumpBack', () => {
		it('only allowed when game has cached states', () => {
			expect(gameHistory.canJumpBack()).toBeFalsy();
			gameHistory = gameHistory.push(1);
			expect(gameHistory.canJumpBack()).toBeFalsy();
			gameHistory = gameHistory.push(2);
			expect(gameHistory.canJumpBack()).toBeTruthy();
			gameHistory = gameHistory.back();
			expect(gameHistory.canJumpBack()).toBeFalsy();
		});
	});
});
