import {Bid} from '../../model/core/bid';
import {Card} from '../../model/core/card';
import {GameBuilder} from '../../model/game/game-builder';
import {StateHistory} from '../state-history';
import gameReducer from '../game-reducer';
import * as actionTypes from '../action-types';

describe('Game Reducer', () => {
	let state;
	let history;
	let initialState;
	let initialHistory;

	beforeEach(() => {
		initialHistory = new StateHistory();
		let gameBuilder = GameBuilder.create();
		let game = gameBuilder.newBoard();
		initialHistory = initialHistory.push(game.build());
		game = gameBuilder.makeBid(Bid.create("1H"));
		initialHistory = initialHistory.push(game.build());
		game = gameBuilder.makeBid(Bid.create("no bid"));
		initialHistory = initialHistory.push(game.build());
		game = gameBuilder.makeBid(Bid.create("no bid"));
		initialHistory = initialHistory.push(game.build());
		game = gameBuilder.makeBid(Bid.create("no bid"));
		initialHistory = initialHistory.push(game.build());
		game = gameBuilder.playCard(Card.create("2H"));
		initialHistory = initialHistory.push(game.build());

		initialHistory = initialHistory
			.back()
			.back();

		initialState = {
			history: initialHistory.build(),
			autoPlay: true,
			sequence: 1
		};
	});

	describe('GAME_PUSH_STATE', () => {
		beforeEach(() => {
			state = gameReducer(initialState, {
				type: actionTypes.GAME_PUSH_STATE,
				state: GameBuilder.create().newBoard().build()
			});
			history = new StateHistory(state.history);
		});


		it('adds the new state to history', () => {
			expect(history.current()).not.to.equal(initialHistory.current());
			expect(history.back().current()).to.equal(initialHistory.current());
		});

		it('increments the sequence', () => {
			expect(state.sequence).to.equal(initialState.sequence + 1);
		});
	});

	describe('GAME_BACK', () => {
		beforeEach(() => {
			state = gameReducer(initialState, {
				type: actionTypes.GAME_BACK
			});

			history = new StateHistory(state.history);
		});

		it('moves to previous state in history', () => {
			expect(history.current()).to.equal(initialHistory.back().current());
		});

		it('increments the sequence', () => {
			expect(state.sequence).to.equal(initialState.sequence + 1);
		});

		it('disables autoplay', () => {
			expect(state.autoPlay).to.be.false;
		});
	});

	describe('GAME_FORWARD', () => {
		beforeEach(() => {
			state = gameReducer(initialState, {
				type: actionTypes.GAME_FORWARD
			});

			history = new StateHistory(state.history);
		});

		it('moves to next state in history', () => {
			expect(history.current()).to.equal(initialHistory.forward().current());
		});

		it('increments the sequence', () => {
			expect(state.sequence).to.equal(initialState.sequence + 1);
		});

		it('disables autoplay', () => {
			expect(state.autoPlay).to.be.false;
		});
	});

	describe('GAME_PAUSE', () => {
		beforeEach(() => {
			state = gameReducer(initialState, {
				type: actionTypes.GAME_PAUSE
			});
		});

		it('increments the sequence', () => {
			expect(state.sequence).to.equal(initialState.sequence + 1);
		});

		it('disables autoplay', () => {
			expect(state.autoPlay).to.be.false;
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
			expect(state.sequence).to.equal(initialState.sequence + 1);
		});

		it('enables autoplay', () => {
			expect(state.autoPlay).to.be.true;
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
			expect(game.currentBoard.biddingHasEnded).to.be.true;
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
			expect(game.currentBoard.biddingHasEnded).to.be.false;
		});
	});*/
});
