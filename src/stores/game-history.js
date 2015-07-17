/* @flow */

import {Game} from "../model/game/game-state";

/**
 * Cache for storing game states and moving back and forwards between them
 */
export class GameHistory {

	constructor() {
		this.gameStates = [];
		this.currentGameIdx = -1;
	}

	push(game: Game) {
		this.gameStates = this.gameStates.slice(0, this.currentGameIdx + 1).concat(game);
		this.currentGameIdx = this.gameStates.length - 1;
	}

	current(): Game {
		return this.gameStates[this.currentGameIdx];
	}

	back() {
		if (this.currentGameIdx > 0)
			this.currentGameIdx --;
	}

	canBack(): boolean {
		return (this.currentGameIdx > 0);
	}

	forward() {
		if (this.currentGameIdx < this.gameStates.length - 1)
			this.currentGameIdx ++;
	}

	canForward() {
		return (this.currentGameIdx < this.gameStates.length - 1);
	}

	jumpBack() {
		let biddingHasEnded = this.current().currentBoard.biddingHasEnded;
		let playHasEnded = this.current().currentBoard.playHasEnded;

		for(let idx = this.currentGameIdx; idx >= 0; idx --) {
			if ((this.gameStates[idx].currentBoard.biddingHasEnded !== biddingHasEnded) ||
				(this.gameStates[idx].currentBoard.playHasEnded !== playHasEnded)) {
				this.currentGameIdx = idx;
				return;
			}
		}

		this.currentGameIdx = 0;
	}

	canJumpBack() {
		return (this.currentGameIdx > 0);
	}
}
