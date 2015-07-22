/* @flow */

import {Game} from "../../game/game-state";

export class CardplayStrategy {

	constructor() {}

	getCard(gameState) {
		let game = new Game(gameState);
		return game.currentBoard.legalCards[0];
	}
}
