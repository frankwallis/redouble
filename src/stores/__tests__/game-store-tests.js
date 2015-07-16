import {Bid} from '../../model/core/bid';
import {GameStore, GameActions} from '../game-store';

describe('Game Store', () => {
	beforeEach(() => {
		GameStore.reset();
	});

	describe('dealBoard', () => {
		it('creates a new board', () => {

		});
	});

	describe('makeBid', () => {
		it('makes valid bids', () => {
			expect(GameStore.currentState().game.currentBoard.bids.length).toBe(0);
			GameActions.makeBid(Bid.create("1D"));
			jest.runAllTimers();
			expect(GameStore.currentState().game.currentBoard.bids.length).toBe(1);
		});

		it('rejects invalid bids', () => {
			expect(GameStore.currentState().game.currentBoard.bids.length).toBe(0);
			GameActions.makeBid(Bid.create("double"));
			jest.runAllTimers();
			expect(GameStore.currentState().game.currentBoard.bids.length).toBe(0);
		});
	});

	describe('playCard', () => {
		it('plays valid cards', () => {
			expect(GameStore.currentState().game.currentBoard.bids.length).toBe(0);
			GameActions.makeBid(Bid.create("1D"));
			jest.runAllTimers();
			expect(GameStore.currentState().game.currentBoard.bids.length).toBe(1);
		});

		it('rejects invalid cards', () => {
			expect(GameStore.currentState().game.currentBoard.bids.length).toBe(0);
			GameActions.makeBid(Bid.create("double"));
			jest.runAllTimers();
			expect(GameStore.currentState().game.currentBoard.bids.length).toBe(0);
		});
	});

	describe('back', () => {
		it('disables auto-play', () => {
			expect(GameStore.currentState().actions.canResume).toBe(false);
			expect(GameStore.currentState().actions.canPause).toBe(true);
			GameActions.makeBid(Bid.create("1D"));
			GameActions.back();
			jest.runAllTimers();
			expect(GameStore.currentState().actions.canResume).toBe(true);
			expect(GameStore.currentState().actions.canPause).toBe(false);
		});
	});

	describe('jumpback', () => {
		it('disables auto-play', () => {
			expect(GameStore.currentState().actions.canResume).toBe(false);
			expect(GameStore.currentState().actions.canPause).toBe(true);
			GameActions.makeBid(Bid.create("1D"));
			GameActions.jumpBack();
			jest.runAllTimers();
			expect(GameStore.currentState().actions.canResume).toBe(true);
			expect(GameStore.currentState().actions.canPause).toBe(false);
		});
	});

	describe('pause', () => {
		it('pauses', () => {
			expect(GameStore.currentState().actions.canResume).toBe(false);
			expect(GameStore.currentState().actions.canPause).toBe(true);
			GameActions.pause();
			jest.runAllTimers();
			expect(GameStore.currentState().actions.canResume).toBe(true);
			expect(GameStore.currentState().actions.canPause).toBe(false);
		});
	});
	
	describe('resume', () => {
		it('resumes', () => {
			expect(GameStore.currentState().actions.canResume).toBe(false);
			expect(GameStore.currentState().actions.canPause).toBe(true);
			GameActions.pause();
			jest.runAllTimers();
			expect(GameStore.currentState().actions.canResume).toBe(true);
			expect(GameStore.currentState().actions.canPause).toBe(false);
			GameActions.resume();
			jest.runAllTimers();
			expect(GameStore.currentState().actions.canResume).toBe(false);
			expect(GameStore.currentState().actions.canPause).toBe(true);
		});
	});
});
