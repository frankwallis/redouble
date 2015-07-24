import {Bid} from '../../model/core/bid';
import {Card} from '../../model/core/card';
import {GameBuilder} from '../../model/game/game-builder';
import {StateHistory} from '../state-history';
import gameReducer from '../game-reducer';
import * as actionTypes from '../action-types';

describe('Game Reducer', () => {
	let state;
	let initialState;

	beforeEach(() => {
		let history = new StateHistory();
		let gameBuilder = GameBuilder.create();
		let game = gameBuilder.newBoard().toQuery();
		history = history.push(game);
		game = gameBuilder.makeBid(Bid.create("1H")).toQuery();
		history = history.push(game);
		game = gameBuilder.makeBid(Bid.create("no bid")).toQuery();
		history = history.push(game);
		game = gameBuilder.makeBid(Bid.create("no bid")).toQuery();
		history = history.push(game);
		game = gameBuilder.makeBid(Bid.create("no bid")).toQuery();
		history = history.push(game);
		game = gameBuilder.playCard(Card.create("2H")).toQuery();
		history = history.push(game);

		history = history
			.back()
			.back();

		initialState = {
			history: history,
			autoPlay: true,
			sequence: 1
		};
	});

	describe('GAME_PUSH_STATE', () => {
		beforeEach(() => {
			state = gameReducer(initialState, {
				type: actionTypes.GAME_PUSH_STATE,
				state: GameBuilder.create().newBoard().toQuery()
			});
		});

		it('adds the new state to history', () => {
			expect(state.history.current()).not.toEqual(initialState.history.current());
			expect(state.history.back().current()).toEqual(initialState.history.current());
		});

		it('increments the sequence', () => {
			expect(state.sequence).toEqual(initialState.sequence + 1);
		});
	});

	describe('GAME_BACK', () => {
		beforeEach(() => {
			state = gameReducer(initialState, {
				type: actionTypes.GAME_BACK
			});
		});

		it('moves to previous state in history', () => {
			expect(state.history.current()).toEqual(initialState.history.back().current());
		});

		it('increments the sequence', () => {
			expect(state.sequence).toEqual(initialState.sequence + 1);
		});

		it('disables autoplay', () => {
			expect(state.autoPlay).toBeFalsy();
		});
	});

	describe('GAME_FORWARD', () => {
		beforeEach(() => {
			state = gameReducer(initialState, {
				type: actionTypes.GAME_FORWARD
			});
		});

		it('moves to next state in history', () => {
			expect(state.history.current()).toEqual(initialState.history.forward().current());
		});

		it('increments the sequence', () => {
			expect(state.sequence).toEqual(initialState.sequence + 1);
		});

		it('disables autoplay', () => {
			expect(state.autoPlay).toBeFalsy();
		});
	});

	describe('GAME_PAUSE', () => {
		beforeEach(() => {
			state = gameReducer(initialState, {
				type: actionTypes.GAME_PAUSE
			});
		});

		it('increments the sequence', () => {
			expect(state.sequence).toEqual(initialState.sequence + 1);
		});

		it('disables autoplay', () => {
			expect(state.autoPlay).toBeFalsy();
		});
	});

	describe('GAME_RESUME', () => {
		beforeEach(() => {
			let pausedState = {
				...initialState,
				autoPlay: false
			};
			state = gameReducer(pausedState, {
				type: actionTypes.GAME_RESUME
			});
		});

		it('increments the sequence', () => {
			expect(state.sequence).toEqual(initialState.sequence + 1);
		});

		it('enables autoplay', () => {
			expect(state.autoPlay).toBeTruthy();
		});
	});

/*	describe('GAME_JUMP_BACK', () => {
		it('moves to start of play when play has started', () => {
			let game = new Game().newBoard();
			history = history.push(game.getState());
			game = game.makeBid(Bid.create("1H"));
			history = history.push(game.getState());
			game = game.makeBid(Bid.create("no bid"));
			history = history.push(game.getState());
			game = game.makeBid(Bid.create("no bid"));
			history = history.push(game.getState());
			game = game.makeBid(Bid.create("no bid"));
			history = history.push(game.getState());

			game = game.makeBid(Card.create("7H"));
			history = history.push(game.getState());

			history = history.jumpBack();
			game = new Game(history.currentGameState());
			expect(game.currentBoard.biddingHasEnded).toBeTruthy();
		});

		it('moves to start of bidding when play has not started', () => {
			let game = new Game().newBoard();
			history = history.push(game.getState());
			game = game.makeBid(Bid.create("1H"));
			history = history.push(game.getState());
			game = game.makeBid(Bid.create("no bid"));
			history = history.push(game.getState());
			game = game.makeBid(Bid.create("no bid"));
			history = history.push(game.getState());
			game = game.makeBid(Bid.create("no bid"));
			history = history.push(game.getState());

			history = history.jumpBack();
			game = new Game(history.currentGameState());
			expect(game.currentBoard.biddingHasEnded).toBeFalsy();
		});
	});*/
});
