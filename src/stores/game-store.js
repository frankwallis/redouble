import {GAME_PUSH_STATE} from "./action-types";
import {Game} from "../model/game/game-state";

let initialState = new Game().newBoard().getState();

export default function gameStore(state = initialState, action) {
	switch (action.type) {
		case GAME_PUSH_STATE:
			return action.state;
		default:
			return state;
	}
}
