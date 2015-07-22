/* @flow */

import {Game} from "./game-state";

/**
 * Helper class for managing game history
 * Immutable
 */
export class GameHistory {

	constructor(historyState) {
		if (historyState) {
			this.gameStates = historyState.gameStates;
			this.currentGameIdx = historyState.currentGameIdx;
		}
		else {
			this.gameStates = [];
			this.currentGameIdx = -1;
		}
	}

	getState() {
		return {
			gameStates: this.gameStates,
			currentGameIdx: this.currentGameIdx
		};
	}

	push(gameState) {
		return new GameHistory({
			gameStates: this.gameStates.slice(0, this.currentGameIdx + 1).concat(gameState),
			currentGameIdx: this.currentGameIdx + 1
		});
	}

	currentGameState() {
		return this.gameStates[this.currentGameIdx];
	}

	back() {
		return new GameHistory({
			gameStates: this.gameStates.slice(0),
			currentGameIdx: this.currentGameIdx - 1
		});
	}

	canBack(): boolean {
		return (this.currentGameIdx > 0);
	}

	forward() {
		return new GameHistory({
			gameStates: this.gameStates.slice(0),
			currentGameIdx: this.currentGameIdx + 1
		});
	}

	canForward() {
		return (this.currentGameIdx < this.gameStates.length - 1);
	}

	jumpBack() {
		let currentGame = new Game(this.currentGameState());
		let newIdx = 0;

		for (let idx = this.currentGameIdx; idx >= 0; idx --) {
			let game = new Game(this.gameStates[idx]);

			if ((game.currentBoard.biddingHasEnded !== currentGame.currentBoard.biddingHasEnded) ||
				(game.currentBoard.playHasEnded !== currentGame.currentBoard.playHasEnded)) {
				newIdx = idx;
				break;
			}
		}

		return new GameHistory({
			gameStates: this.gameStates.slice(0),
			currentGameIdx: newIdx
		});
	}

	canJumpBack() {
		return (this.currentGameIdx > 0);
	}
}
