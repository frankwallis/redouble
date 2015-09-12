/* @flow */

import {BoardQuery} from "../../game/board-query";

export class CardplayStrategy {

	constructor() {}

	getCard(boardState) {
		let board = new BoardQuery(gameState);
		return Promise.resolve(board.legalCards[0]);
	}
}
