import {GameQuery} from "../model/game/game-query";
import {GameBuilder} from "../model/game/game-builder";
import {StateHistory} from "./state-history";

import {
	GAME_PUSH_STATE, GAME_BACK, GAME_FORWARD, GAME_JUMP_BACK,
	GAME_PAUSE, GAME_RESUME
} from "./action-types";

let game = GameBuilder.create().newBoard().toQuery();
let history = new StateHistory().push(game);

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
				history: state.history.push(new GameQuery(action.state)),
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
			let jumpComparer = (game1, game2) => {
				return ((game1.currentBoard.biddingHasEnded !== game2.currentBoard.biddingHasEnded) ||
					(game1.currentBoard.playHasEnded !== game2.currentBoard.playHasEnded));
			};

			return {
				...state,
				history: state.history.jumpBack(jumpComparer),
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
