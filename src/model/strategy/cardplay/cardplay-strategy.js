/* @flow */

import {GameQuery} from "../../game/game-query";

export class CardplayStrategy {

	constructor() {}

	getCard(gameState) {
		let game = new GameQuery(gameState);
		return game.currentBoard.legalCards[0];
	}
}
