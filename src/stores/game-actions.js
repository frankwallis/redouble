
import {Game} from "../model/game/game-state";
import {GameHistory} from "../model/game/game-history";

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
		let gameStore = getState().gameStore;
		let newgame = new Game().newBoard();
		dispatch(pushState(newgame.getState()));
		scheduleAutoPlay(gameStore.sequence + 1, dispatch, getState);
	};
}

export function playCard(card) {
	return (dispatch, getState) => {
		let gameStore = getState().gameStore;
		let history = new GameHistory(gameStore.history);
		let game = new Game(history.currentGameState());
		let err = validateCard(card, game.currentBoard);

		if (!err) {
			let newgame = game.playCard(card);
			dispatch(pushState(newgame.getState()));
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
		let gameStore = getState().gameStore;
		let history = new GameHistory(gameStore.history);
		let game = new Game(history.currentGameState());
		let err = validateBid(bid, game.currentBoard);

		if (!err) {
			let newgame = game.makeBid(bid);
			dispatch(pushState(newgame.getState()));
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
			let history = new GameHistory(getState().gameStore.history);
			let game = new Game(history.currentGameState());

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

export function forward(state) {
	return { type: GAME_FORWARD };
}

export function jumpBack(state) {
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
