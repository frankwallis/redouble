/* @flow */

import {Seat} from "../core/seat";
import {Bid} from "../core/bid";
import {Card} from "../core/card";
import {Board} from "./board-state";

/**
 * Helper class for analysing game-state.
 * This class is designed to be immutable from the outside
 */
export class Game {

	constructor(gameState) {
		this.gameState = gameState || { boards: [] };
	}

	getState() {
		return this.gameState;
	}

	get boards() {
		return this.gameState.boards;
	}

	/**
	 * Returns the current board
	 */
	get currentBoard(): Board {
		return this.boards[this.boards.length - 1];
	}

	/**
	 * Starts a new board
	 */
	dealBoard(dealer: Seat): Game {
		return this.newBoard(dealer);
	}

	/**
	 * Adds a new board with the passed in state
	 */
	newBoard(dealer, handlist, bids, cards): Game {
		let board = Board.create(dealer, handlist, bids, cards);
		let boards = this.boards.slice(0).concat(board);
		return new Game({boards});
	}

	/**
	 * Called in response to a player playing a card.
	 * If the bid is valid returns the new game,
	 * otherwise an exception is thrown
	 */
	makeBid(bid: Bid): Game {
		let board = this.currentBoard.makeBid(bid);
		let boards = this.boards.slice(0, this.boards.length - 1).concat(board);
		return new Game({boards});
	}

	/**
	 * Called in response to a player making a bid.
	 * If the card is valid returns the new game,
	 * otherwise an exception is thrown
	 */
	playCard(card: Card): Game {
		let board = this.currentBoard.playCard(card);
		let boards = this.boards.slice(0, this.boards.length - 1).concat(board);
		return new Game({boards});
	}
}
