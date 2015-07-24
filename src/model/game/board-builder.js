/* @flow */

import {Seat} from "../core/seat";
import {Bid} from "../core/bid";
import {Card} from "../core/card";
import {Deck} from "../core/deck";
import {BoardQuery} from "./board-query";

/**
 * Helper class for creating game-states
 * Uses builder pattern and returned state objects are immutable
 */
export class BoardBuilder {

	constructor(boardState) {
		this.boardState = boardState;
	}

	build() {
		return this.boardState;
	}

	/**
	 * Creates a new board with the passed in state,
	 * defaults all parameters where necessary
	 */
	static create(dealer, hands, bids, cards): BoardBuilder {
		dealer = dealer || Seat.North;

		if (!hands) {
			let deck = new Deck();
			deck.shuffle();
			hands = deck.deal(dealer);
		}

		bids = bids || [];
		cards = cards || [];

		return new BoardBuilder({dealer, hands, bids, cards});
	}

	/**
	 * Mutates the state by adding a bid
	 */
	makeBid(bid: Bid): BoardBuilder {
		let bids = this.boardState.bids.concat(bid);
		this.boardState = {
			...this.boardState,
			bids
		};
		return this;
	}

	/**
	 * Mutates the state by adding a played card
	 */
	playCard(card: Card): BoardBuilder {
		let cards = this.boardState.cards.concat({seat: this.toQuery().nextPlayer, card });
		this.boardState = {
			...this.boardState,
			cards
		};
		return this;
	}

	/**
	 * Returns a query object for the current state
	 */
	toQuery(): BoardQuery {
		return new BoardQuery(this.boardState);
	}
}
