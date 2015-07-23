/* @flow */

import {Seat} from "../model/core/seat";
import {PLAYER_UPDATE} from "./action-types";

const STORAGE_KEY = 'players';

function loadInitialState() {
	let playersStr = window.localStorage ? window.localStorage.getItem(STORAGE_KEY) : undefined;

	if (playersStr) {
		return JSON.parse(playersStr);
	}
	else {
		return Seat.all().reduce((result, seat) => {
			result[seat] = {
				seat: seat,
				name: Seat.name(seat),
				ishuman: (seat === Seat.South)
			};

			return result;
		}, {});
	}
}

let initialState = loadInitialState();

export default function playerReducer(state = initialState, action) {
	switch (action.type) {
		case PLAYER_UPDATE:
			let newstate = {...state};

			Object.keys(action.delta).forEach((key) => {
				newstate[action.seat][key] = action.delta[key];
			});
			// TODO
			//localStorage.setItem(STORAGE_KEY, JSON.stringify(this.players));
			return newstate;
		default:
			return state;
	}
}
