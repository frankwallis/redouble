/* @flow */

import {BoardQuery} from "../../game/board-query";

export function getCard(boardState) {
	let board = new BoardQuery(gameState);
	return Promise.resolve(board.legalCards[0]);
}
