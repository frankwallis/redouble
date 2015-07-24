import {Bid} from '../../model/core/bid';
import {Card} from '../../model/core/card';
import {Game} from '../../model/game/game-state';
import {GameHistory} from '../../model/game/game-history';
import gameReducer from '../game-reducer';
import * as actionTypes from '../action-types';

describe('Game Reducer', () => {
	let state;
	let initialState;

	beforeEach(() => {
		let history = new GameHistory();
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
		game = game.playCard(Card.create("2H"));
		history = history.push(game.getState());

		history.back();
		history.back();

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
				state: new Game().newBoard().getState()
			});
		});

		it('adds the new state to history', () => {
			expect(state.history.currentGameIdx).toEqual(initialState.history.currentGameIdx + 1);
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
			expect(state.history.currentGameIdx).toEqual(initialState.history.currentGameIdx - 1);
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
			expect(state.history.currentGameIdx).toEqual(initialState.history.currentGameIdx + 1);
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
});
