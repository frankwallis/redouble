import {Game} from "../model/game/game-state";
import {GameHistory} from "../model/game/game-history";

import {
	GAME_PUSH_STATE, GAME_BACK, GAME_FORWARD, GAME_JUMP_BACK,
	GAME_PAUSE, GAME_RESUME
} from "./action-types";

let game = new Game().newBoard();
let history = new GameHistory().push(game.getState());

let initialState = {
	history,
	sequence: 0,
	autoPlay: true
}

export default function gameReducer(state = initialState, action) {
	switch (action.type) {
		case GAME_PUSH_STATE:
			return {
				...state,
				history: state.history.push(action.state),
				sequence: state.sequence + 1
			};
		case GAME_BACK:
			return {
				...state,
				history: state.history.back(),
				sequence: state.sequence + 1,
				autoPlay: false
			};
		case GAME_FORWARD:
			return {
				...state,
				history: state.history.forward(),
				sequence: state.sequence + 1,
				autoPlay: false
			};
		case GAME_JUMP_BACK:
			return {
				...state,
				history: state.history.jumpBack(),
				sequence: state.sequence + 1,
				autoPlay: false
			};
		case GAME_PAUSE:
			return {
				...state,
				sequence: state.sequence + 1,
				autoPlay: false
			};
		case GAME_RESUME:
			return {
				...state,
				sequence: state.sequence + 1,
				autoPlay: true
			}
		default:
			return state;
	}
}
