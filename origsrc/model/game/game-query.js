/* @flow */

import {BoardQuery} from "./board-query";

/**
 * Helper class for analysing game-state.
 * Immutable
 */
export class GameQuery {

	constructor(gameState) {
		this.gameState = gameState || { boards: [] };

		if (this.gameState.boards.length > 0)
			this._currentBoard = new BoardQuery(this.gameState.boards[this.gameState.boards.length - 1]);
	}

	get boards() {
		return this.gameState.boards;
	}

	/**
	 * Returns the current board
	 */
	get currentBoard(): BoardQuery {
		return this._currentBoard;
	}
}
