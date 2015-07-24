/* @flow */

import {BidSuit, BidType} from "../../core/bid";
import {GameQuery} from "../../game/game-query";

export class BiddingStrategy {

	constructor() {}

	getBid(gameState) {
		let game = new GameQuery(gameState);

		if (!game.currentBoard.lastCall) {
			return {type: BidType.NoBid};
		}
		else if ((game.currentBoard.bids.length > 0) &&
					(game.currentBoard.bids.length < 4)) {
			return {
				type: BidType.Call,
				suit: game.currentBoard.lastCall.suit + 1 || BidSuit.Clubs,
				level: game.currentBoard.lastCall.level + 1 || 1
			};
		}
		else {
			return {type: BidType.NoBid};
		}
	}
}
