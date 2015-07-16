jest.autoMockOff();

import {GameHistory} from '../game-history';

describe('Game History', () => {
	let gameHistory = null;

	beforeEach(() => {
		gameHistory = new GameHistory();
	});

	describe('push/current', () => {
		it('adds a game', () => {
			gameHistory.push(1);
			expect(gameHistory.current()).toEqual(1);
			gameHistory.push(2);
			expect(gameHistory.current()).toEqual(2);
		});

		it('clears forward history', () => {
			gameHistory.push(1);
			expect(gameHistory.current()).toEqual(1);
			gameHistory.push(2);
			expect(gameHistory.current()).toEqual(2);
			gameHistory.back();
			gameHistory.push(3);
			expect(gameHistory.current()).toEqual(3);
			gameHistory.back();
			expect(gameHistory.current()).toEqual(1);
		});
	});

	describe('back', () => {
		it('moves back to previous state', () => {
			gameHistory.push(1);
			gameHistory.push(2);
			gameHistory.back();
			expect(gameHistory.current()).toEqual(1);
		});
	});

	describe('canBack', () => {
		it('only allowed when game has cached states', () => {
			expect(gameHistory.canBack()).toBeFalsy();
			gameHistory.push(1);
			expect(gameHistory.canBack()).toBeFalsy();
			gameHistory.push(2);
			expect(gameHistory.canBack()).toBeTruthy();
			gameHistory.back();
			expect(gameHistory.canBack()).toBeFalsy();
		});
	});

	describe('forward', () => {
		it('moves forward to previously created state', () => {
			gameHistory.push(1);
			gameHistory.push(2);
			gameHistory.back();
			expect(gameHistory.current()).toEqual(1);
			gameHistory.forward();
			expect(gameHistory.current()).toEqual(2);
		});
	});

	describe('canForward', () => {
		it('only allowed when game has cached states', () => {
			expect(gameHistory.canForward()).toBeFalsy();
			gameHistory.push(1);
			gameHistory.push(2);
			expect(gameHistory.canForward()).toBeFalsy();
			gameHistory.back();
			expect(gameHistory.canForward()).toBeTruthy();
			gameHistory.forward();
			expect(gameHistory.canForward()).toBeFalsy();
		});
	});

	describe('jumpBack', () => {
		it('moves to start of play when play has started', () => {
			gameHistory.push({
				currentBoard: {
					biddingHasEnded: false,
					playHasEnded: false
				}
			});
			gameHistory.push({
				currentBoard: {
					biddingHasEnded: true,
					playHasEnded: false
				}
			});
			gameHistory.jumpBack();
			expect(gameHistory.current().currentBoard.biddingHasEnded).toBeFalsy();
		});

		it('moves to start of bidding when play has not started', () => {
			gameHistory.push({
				currentBoard: {
					biddingHasEnded: true,
					playHasEnded: true
				}
			});
			gameHistory.push({
				currentBoard: {
					biddingHasEnded: false,
					playHasEnded: false
				}
			});
			gameHistory.jumpBack();
			expect(gameHistory.current().currentBoard.biddingHasEnded).toBeTruthy();
		});
	});

	describe('canJumpBack', () => {
		it('only allowed when game has cached states', () => {
			expect(gameHistory.canJumpBack()).toBeFalsy();
			gameHistory.push(1);
			expect(gameHistory.canJumpBack()).toBeFalsy();
			gameHistory.push(2);
			expect(gameHistory.canJumpBack()).toBeTruthy();
			gameHistory.back();
			expect(gameHistory.canJumpBack()).toBeFalsy();
		});
	});
});
