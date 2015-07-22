
import {Game} from "../model/game/game-state";
import {CardplayStrategy} from "../model/strategy/cardplay/cardplay-strategy";
import {BiddingStrategy} from "../model/strategy/bidding/bidding-strategy";

import {validateBid, validateCard} from "../model/game/validators";
import {notifyError} from "./notification-actions";
import {GAME_PUSH_STATE} from "./action-types";

let cardplayStrategy = new CardplayStrategy();
let biddingStrategy = new BiddingStrategy();

export function newGame() {
	return (dispatch, getState) => {
		let gameStore = getState().gameStore;
		let newgame = new Game().newBoard();
		dispatch(pushState(newgame.getState()));
		scheduleAutoPlay(gameStore.sequence + 1, dispatch, getState);
	};
}

export function playCard(card) {
	return (dispatch, getState) => {
		let gameStore = getState().gameStore;
		let game = new Game(gameStore.game);
		let err = validateCard(card, game.currentBoard);

		if (!err) {
			let newgame = game.playCard(card);
			dispatch(pushState(newgame.getState()));
			scheduleAutoPlay(gameStore.sequence + 1, dispatch, getState);
		}
		else {
			dispatch(notifyError({
				title: "Invalid card",
				message: err.message
			}));
		}
	};
}

export function makeBid(bid) {
	return (dispatch, getState) => {
		let gameStore = getState().gameStore;
		let game = new Game(gameStore.game);
		let err = validateBid(bid, game.currentBoard);

		if (!err) {
			let newgame = game.makeBid(bid);
			dispatch(pushState(newgame.getState()));
			scheduleAutoPlay(gameStore.sequence + 1, dispatch, getState);
		}
		else {
			dispatch(notifyError({
				title: "Invalid bid",
				message: err.message
			}));
		}
	};
}

function scheduleAutoPlay(forSequence, dispatch, getState) {
	setTimeout(() => {
		let players = getState().playerStore;
		let sequence = getState().gameStore.sequence;
		let game = new Game(getState().gameStore.game);

		if (sequence === forSequence) {
			if (game.currentBoard.nextPlayer && !players[game.currentBoard.nextPlayer].ishuman) {
				if (game.currentBoard.biddingHasEnded) {
					dispatch(playCard(cardplayStrategy.getCard(game)));
				}
				else
					dispatch(makeBid(biddingStrategy.getBid(game)));
			}
		}
		else {
			console.log('the game has moved on');
		}
	}, 2000);
}

export function pushState(state) {
	let type = GAME_PUSH_STATE;
	return { type, state };
}
