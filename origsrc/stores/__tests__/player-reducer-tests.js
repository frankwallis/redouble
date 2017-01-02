import {Seat} from '../../model/core/seat';
import playerReducer from '../player-reducer';
import * as actionTypes from '../action-types';

describe('Player Reducer', () => {
	let initialState;

	beforeEach(() => {
		initialState = {};
		initialState[Seat.North] = {
			name: "frank",
			ishuman: false
		};
		initialState[Seat.North] = {
			name: "sven",
			ishuman: false
		};
		initialState[Seat.North] = {
			name: "mike",
			ishuman: false
		};
		initialState[Seat.North] = {
			name: "silvia",
			ishuman: true
		};
	});

	describe('PLAYER_UPDATE', () => {
		it('updates the name', () => {
			let state = playerReducer(initialState, {
				type: actionTypes.PLAYER_UPDATE,
				seat: Seat.North,
				delta: {
					name: "mik"
				}
			});

			expect(state[Seat.North].name).to.equal("mik");
		});

		it('updates ishuman', () => {
			let state = playerReducer(initialState, {
				type: actionTypes.PLAYER_UPDATE,
				seat: Seat.North,
				delta: {
					name: "mik",
					ishuman: true
				}
			});

			expect(state[Seat.North].name).to.equal("mik");
			expect(state[Seat.North].ishuman).to.equal(true);
		});
	});
});
