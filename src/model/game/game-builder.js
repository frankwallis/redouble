/* @flow */

import {Seat} from "../core/seat";
import {Bid} from "../core/bid";
import {Card} from "../core/card";
import {GameQuery} from "./game-query";
import {BoardBuilder} from "./board-builder";

/**
 * Helper class for creating game-states
 * Uses builder pattern and state objects returned from
 * build() are immutable
 */
export class GameBuilder {

	constructor(gameState) {
		this.gameState = gameState;
	}

	/**
	 * Initialises a brand new game
	 */
	static create() {
		return new GameBuilder({ boards: [] });
	}

	/**
	 * Returns the current state
	 */
	build() {
		return this.gameState;
	}

	/**
	 * Starts a new board
	 */
	dealBoard(dealer: Seat): GameBuilder {
		return this.newBoard(dealer);
	}

	/**
	 * Adds a new board with the passed in state
	 */
	newBoard(dealer, handlist, bids, cards): GameBuilder {
		let board = BoardBuilder.create(dealer, handlist, bids, cards).build();
		let boards = this.gameState.boards.concat(board);
		this.gameState = { boards };
		return this;
	}

	/**
	 * Called in response to a player making a bid.
	 * If the bid is valid returns the new game,
	 * otherwise an exception is thrown
	 */
	makeBid(bid: Bid): GameBuilder {
		let boardBuilder = new BoardBuilder(this.currentBoard);
		boardBuilder.makeBid(bid);
		let boards = this.gameState.boards.slice(0, this.gameState.boards.length - 1).concat(boardBuilder.build());
		this.gameState = { boards };
		return this;
	}

	/**
	 * Called in response to a player playing a card.
	 * If the card is valid returns the new game,
	 * otherwise an exception is thrown
	 */
	playCard(card: Card): GameBuilder {
		let boardBuilder = new BoardBuilder(this.currentBoard);
		boardBuilder.playCard(card);
		let boards = this.gameState.boards.slice(0, this.gameState.boards.length - 1).concat(boardBuilder.build());
		this.gameState = { boards };
		return this;
	}

	/**
	 * Returns a GameQuery object for the current state
	 */
	toQuery(): GameQuery {
		return new GameQuery(this.gameState);
	}

	/**
	 * Returns the current board
	 * private
	 */
	get currentBoard() {
		return this.gameState.boards[this.gameState.boards.length - 1];
	}

}
