/* @flow */

import {BoardQuery} from "../../game/board-query";

export function getCard(boardState) {
	let board = new BoardQuery(boardState);
	return Promise.resolve(board.legalCards[0]);
}
