import {GAME_PUSH_STATE} from "./action-types";
import {Game} from "../model/game/game-state";

let initialState = {
	game: new Game().newBoard().getState(),
	sequence: 0
}

export default function gameStore(state = initialState, action) {
	switch (action.type) {
		case GAME_PUSH_STATE:
			return {
				game: action.state,
				sequence: state.sequence + 1
			};
		default:
			return state;
	}
}
