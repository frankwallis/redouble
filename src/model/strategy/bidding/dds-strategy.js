/* @flow */

import {BidSuit, BidType} from "../../core/bid";
import {GameQuery} from "../../game/game-query";

export function getBid(gameState) {
	let game = new GameQuery(gameState);
	let result;

	if (!game.currentBoard.lastCall) {
		result = {type: BidType.NoBid};
	}
	else if ((game.currentBoard.bids.length > 0) &&
				(game.currentBoard.bids.length < 4)) {
		result = {
			type: BidType.Call,
			suit: game.currentBoard.lastCall.suit + 1 || BidSuit.Clubs,
			level: game.currentBoard.lastCall.level + 1 || 1
		};
	}
	else {
		result = {type: BidType.NoBid};
	}

	return Promise.resolve(result);
}
