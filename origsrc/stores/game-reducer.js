import {GameQuery} from "../model/game/game-query";
import {GameBuilder} from "../model/game/game-builder";
import {StateHistory} from "./state-history";

import {
	GAME_PUSH_STATE, GAME_BACK, GAME_FORWARD, GAME_JUMP_BACK,
	GAME_PAUSE, GAME_RESUME
} from "./action-types";

let gameState = GameBuilder.create().newBoard().build();
let history = new StateHistory().push(gameState).build();

let initialState = {
	history,
	sequence: 0,
	autoPlay: true
};

export default function gameReducer(state = initialState, action) {
	switch (action.type) {
		case GAME_PUSH_STATE:
			return {
				...state,
				history: new StateHistory(state.history).push(action.state).build(),
				sequence: state.sequence + 1
			};
		case GAME_BACK:
			return {
				...state,
				history: new StateHistory(state.history).back().build(),
				sequence: state.sequence + 1,
				autoPlay: false
			};
		case GAME_FORWARD:
			return {
				...state,
				history: new StateHistory(state.history).forward().build(),
				sequence: state.sequence + 1,
				autoPlay: false
			};
		case GAME_JUMP_BACK:
			const jumpComparer = (state1, state2) => {
				let game1 = new GameQuery(state1);
				let game2 = new GameQuery(state2);

				return ((game1.currentBoard.biddingHasEnded !== game2.currentBoard.biddingHasEnded) ||
					(game1.currentBoard.playHasEnded !== game2.currentBoard.playHasEnded));
			};

			return {
				...state,
				history: new StateHistory(state.history).jumpBack(jumpComparer).build(),
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
			};
		default:
			return state;
	}
}
