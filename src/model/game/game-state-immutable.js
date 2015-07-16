/* @flow */

import Immutable from "immutable";

import {Seat} from "../core/seat";
import {Bid, BidType, BidSuit} from "../core/bid";
import {Card, Pip, Suit} from "../core/card";
import {validateBid, validateCard} from "./validators";
import {Board} from "./board-state";

/** 
 * Helper class for analysing game-state.
 * This class is designed to be immutable from the outside
 */
export class Game {

	constructor(gameState: Immutable.Map) {
		this.gameState = gameState || Immutable.fromJS({ boards: [] });
		
		let boardCount = this.gameState.get("boards").size;

		if (boardCount > 0)
			this._currentBoard = new Board(this.gameState.get("boards").get(boardCount -1));
	}

	/**
	 * Returns the current board
	 */
	get currentBoard(): Board {
		return this._currentBoard;
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
		let newstate = this.gameState.update("boards", boards => boards.push(board.boardState));
		return new Game(newstate);
	}

	/**
	 * Called in response to a player playing a card.
	 * If the bid is valid returns the new game,
	 * otherwise an exception is thrown
	 */
	makeBid(bid: Bid): Game {
		let board = this.currentBoard.makeBid(bid);
		let newstate = this.gameState.update("boards", boards => boards.set(boards.size -1, board.boardState));
		return new Game(newstate);
	}

	/**
	 * Called in response to a player making a bid.
	 * If the card is valid returns the new game,
	 * otherwise an exception is thrown
	 */
	playCard(card: Card): Game {
		let board = this.currentBoard.playCard(card);
		let newstate = this.gameState.update("boards", boards => boards.set(boards.size -1, board.boardState));
		return new Game(newstate);
	}

}