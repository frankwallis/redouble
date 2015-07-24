
import {GameBuilder} from "../model/game/game-builder";

import {CardplayStrategy} from "../model/strategy/cardplay/cardplay-strategy";
import {BiddingStrategy} from "../model/strategy/bidding/bidding-strategy";

import {validateBid, validateCard} from "../model/game/validators";
import {notifyError} from "./notification-actions";

import {
	GAME_PUSH_STATE, GAME_BACK, GAME_FORWARD, GAME_JUMP_BACK,
	GAME_PAUSE, GAME_RESUME
} from "./action-types";

let cardplayStrategy = new CardplayStrategy();
let biddingStrategy = new BiddingStrategy();

export function newGame() {
	return (dispatch, getState) => {
		let newgame = GameBuilder.create().newBoard().build();
		dispatch(pushState(newgame));
		scheduleAutoPlay(getState().gameStore.sequence, dispatch, getState);
	};
}

export function playCard(card) {
	return (dispatch, getState) => {
		let game = getState().gameStore.history.current();
		let err = validateCard(card, game.currentBoard);

		if (!err) {
			let gameBuilder = new GameBuilder(game.gameState);
			let newstate = gameBuilder.playCard(card).build();
			dispatch(pushState(newstate));
			scheduleAutoPlay(getState().gameStore.sequence, dispatch, getState);
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
		let game = getState().gameStore.history.current();
		let err = validateBid(bid, game.currentBoard);

		if (!err) {
			let gameBuilder = new GameBuilder(game.gameState);
			let newstate = gameBuilder.makeBid(bid).build();
			dispatch(pushState(newstate));
			scheduleAutoPlay(getState().gameStore.sequence, dispatch, getState);
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
		let sequence = getState().gameStore.sequence;

		if (sequence === forSequence) {
			let players = getState().playerStore;
			let game = getState().gameStore.history.current();

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

function pushState(state) {
	return { type: GAME_PUSH_STATE, state };
}

export function back() {
	return { type: GAME_BACK };
}

export function forward() {
	return { type: GAME_FORWARD };
}

export function jumpBack() {
	return { type: GAME_JUMP_BACK };
}

export function pause() {
	return { type: GAME_PAUSE };
}

export function resume() {
	return (dispatch, getState) => {
		dispatch({ type: GAME_RESUME });
		scheduleAutoPlay(getState().gameStore.sequence, dispatch, getState);
	};
}
