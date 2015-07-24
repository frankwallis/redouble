/* @flow */

import {Node} from "./mcts-node";
import {GameQuery} from "../../game/game-query";

export class CardplayStrategy {

	constructor() {
		this.boards = {};
		this.rootNode = undefined;
		this.started = false;
	}

	updateGameState(gameState) {
		let board = new GameQuery(gameState).currentBoard;

		if (board.biddingHasEnded) {
			this.rootNode = this.getRootNode(board);
			this.start();
		}
		else {
			this.stop();
		}

		console.log('updated game state');
	}

	getCard() {
		let card = this.rootNode.bestCard();
		console.log("visits = " + this.rootNode.visits);
		return Promise.resolve(card);
	}

	start() {
		if (!this.started) {
			this.started = true;
			this.nextVisit();
		}
	}

	stop() {
		this.started = false;
	}

	nextVisit() {
		if (this.started) {
			// limit to 50% CPU
			let startTime = new Date();
			this.visit(15);
			let endTime = new Date();
			setTimeout(() => this.nextVisit(), endTime - startTime);
		}
	}

	visit(rounds) {
		rounds = rounds || 1;
		for (let round = 0; round < rounds; round += 1)
			this.rootNode.visit();
	}

	getRootNode(board) {
		let key = JSON.stringify(board.hands);

		if (!this.boards[key])
			this.boards[key] = new Node(null, board, null);

		return this.boards[key].seek(board.cards);
	}
}
