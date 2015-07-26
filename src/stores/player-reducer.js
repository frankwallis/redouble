/* @flow */

import {Seat} from "../model/core/seat";
import {APP_REHYDRATE, PLAYER_UPDATE} from "./action-types";

function getDefaultState() {
	return Seat.all().reduce((result, seat) => {
		result[seat] = {
			seat: seat,
			name: Seat.name(seat),
			ishuman: (seat === Seat.South)
		};

		return result;
	}, {});
}

let initialState = getDefaultState();

export default function playerReducer(state = initialState, action) {
	switch (action.type) {
		case PLAYER_UPDATE:
			let newstate = {...state};

			Object.keys(action.delta).forEach((key) => {
				newstate[action.seat][key] = action.delta[key];
			});
			return newstate;

		case APP_REHYDRATE:
			if (action.reducer === 'playerStore') {
				return {
					...state,
					...action.data
				};
			}
			return state;

		default:
			return state;
	}
}
