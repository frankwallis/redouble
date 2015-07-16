
/* @flow */

import {GameActions} from "./game-store";
import {PlayerStore} from "./player-store";
import {CardplayStrategyProxy} from "./strategy-proxy";
import {BiddingStrategy} from "../model/strategy/bidding/bidding-strategy";

/**
 * Handles automatically bidding and playing cards after specified timeout
 */
export class AutoPlayer {
	constructor() {
		this.cardplayStrategy = new CardplayStrategyProxy();
		this.biddingStrategy = new BiddingStrategy();		
	}

	updateGameState(game) {
		this.game = game;
		this.cardplayStrategy.updateGameState(game);		
	}

	scheduleAutoPlay(game) {
		if (!game.currentBoard.nextPlayer) return;
		if (PlayerStore.players[game.currentBoard.nextPlayer].ishuman) return;

		setTimeout(() => {
			if (game.currentBoard.biddingHasEnded) {
				this.cardplayStrategy.getCard()
					.then((card) => {
						if (game === this.game)
							GameActions.playCard(card);
						else
							console.log("The game has moved on!");
					});

			}
			else {
				if (game === this.game) {
					let bid = this.biddingStrategy.getBid(game.gameState);
					GameActions.makeBid(bid, game);
				}
			}
		}, 2000);
	}
}