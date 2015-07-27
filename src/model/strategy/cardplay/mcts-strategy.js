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
		}
	}

	getCard() {
		this.visit(20);
		//console.log("visits = " + this.rootNode.visits);
		let card = this.rootNode.bestCard();
		return Promise.resolve(card);
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
