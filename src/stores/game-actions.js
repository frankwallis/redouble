
import {Game} from "../model/game/game-state";
import {validateBid, validateCard} from "../model/game/validators";
import {notifyError} from "./notification-actions";
import {GAME_PUSH_STATE} from "./action-types";

export function playCard(card) {
	return (dispatch, getState) => {
		let game = new Game(getState().gameStore);
		let err = validateCard(card, game.currentBoard);

		if (!err) {
			dispatch(pushState(game.playCard(card).getState()));
		}
		else {
			dispatch(notifyError({
				title: "Invalid card",
				message: err.message
			}));
		}
	}
}

export function makeBid(bid) {
	return (dispatch, getState) => {
		let game = new Game(getState().gameStore);
		let err = validateBid(bid, game.currentBoard);

		if (!err) {
			dispatch(pushState(game.makeBid(bid).getState()));
		}
		else {
			dispatch(notifyError({
				title: "Invalid bid",
				message: err.message
			}));
		}
	}
}

export function pushState(state) {
	let type = GAME_PUSH_STATE;
	return { type, state };
}
