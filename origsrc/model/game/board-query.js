/* @flow */

import {Seat} from "../core/seat";
import {Bid, BidType, BidSuit} from "../core/bid";
import {Card} from "../core/card";
import {validateBid} from "./validators";

/**
 * Helper class for analysing board-state.
 */
export class BoardQuery {

	constructor(boardState) {
		this.boardState = boardState;
	}

	get hands() { return this.boardState.hands; }
	get dealer() { return this.boardState.dealer; }
	get bids() { return this.boardState.bids; }
	get cards() { return this.boardState.cards; }

	/**
	 * Returns the last bid to be made of any type
	 */
	get lastBid() {
		return this.boardState.bids[this.boardState.bids.length - 1];
	}

	/**
	 * Returns the last bid to be made of type Bid.Call
	 */
	get lastCall() {
		return this.boardState.bids
			.reduce((lastCall, current) => {
				if (current.type === BidType.Call)
					return current;
				else
					return lastCall;
			}, undefined);
	}

	/**
	 * Returns the player who made the lastCall
	 */
	get lastCaller() {
		let call = this.lastCall;
		if (call) return Seat.rotate(this.boardState.dealer, this.boardState.bids.indexOf(call));
	}

	/**
	 * Returns the last bid to be made which was not a no-bid
	 */
	get lastAction() {
		return this.boardState.bids
			.reduce((lastAction, current) => {
				if (current.type !== BidType.NoBid)
					return current;
				else
					return lastAction;
			}, undefined);
	}

	/**
	 * Returns the seat whic made the lastAction
	 */
	get lastActor() {
		let act = this.lastAction;
		if (act) return Seat.rotate(this.boardState.dealer, this.boardState.bids.indexOf(act));
	}

	/**
	 * Returns the suit of the bid contract or undefined if the bidding has not ended
	 * or no suit has been bid yet
	 */
	get trumpSuit() {
		if (this.biddingHasEnded && this.lastCall)
			return this.lastCall.suit;
	}

	/**
	 * Returns true when no more bids can be made
	 */
	get biddingHasEnded() {
		return (this.bids.length >= 4) && !this.bids.slice(-3).some(bid => bid.type !== BidType.NoBid);
	}

	/**
	 * Returns the current trick, which will be an array of the cards which have been
	 * played to the trick, starting with the lead card. If no cards have been played
	 * yet it returns an empty array.
	 */
	get currentTrick() {
		let played = this.boardState.cards.length % 4;
		played = played || 4;
		return this.boardState.cards.slice(played * -1);
	}

	/*
	 * Returns the winner of the previous trick
	 */
	get previousTrickWinner() {
		if (this.boardState.cards.length < 4) return undefined;
		let played = this.boardState.cards.length % 4;
		let trick = this.boardState.cards.slice(this.boardState.cards.length - played - 4, this.boardState.cards.length - played);

		let leadSuit = trick[0].card.suit;
		let winner = trick.sort((played1, played2) => {
			return Card.compare(played1.card, played2.card, this.trumpSuit, leadSuit);
		})[3].seat;

		return winner;
	}

	/*
	 * Returns the number of tricks declarer has won
	 */
	get declarerTricks() {
		let trickCount = Math.floor(this.boardState.cards.length / 4);
		let result = 0;

		let sortTrick = (trick) => {
			let leadSuit = trick[0].card.suit;
			return trick.sort((played1, played2) => Card.compare(played1.card, played2.card, this.trumpSuit, leadSuit));
		};

		for (let i = 0; i < trickCount; i ++) {
			let trick = this.boardState.cards.slice(i * 4, (i * 4) + 4);

			let winner = sortTrick(trick)[3].seat;

			if ((winner === this.declarer) || Seat.isPartner(this.declarer, winner))
				result ++;
		}

		return result;
	}

	/**
	 * Returns true when no more cards can be played
	 */
	get playHasEnded() {
		return (this.boardState.cards.length === Seat.all().reduce((total, seat) => total + this.hands[seat].length, 0));
	}

	/**
	 * Returns true if this card has already been played
	 */
	hasBeenPlayed(card) {
		return this.boardState.cards
			.some((played) => Card.equals(card, played.card));
	}

	/**
	 * Returns the seat of the lead card
	 */
	get declarer() {
		if (!this.biddingHasEnded)
			throw new Error("the bidding has not ended yet");

		if (this.lastCall) {
			for (let i = 0; i < this.boardState.bids.length - 1; i ++) {
				if (this.boardState.bids[i].suit === this.lastCall.suit)
					return Seat.rotate(this.boardState.dealer, i);
			}
		}

		throw new Error("declarer not found");
	}

	get dummy() {
		return Seat.rotate(this.declarer, 2);
	}

	/**
	 * Returns the seat of the lead card
	 */
	get leader() {
		if (this.boardState.cards.length < 4)
			return Seat.rotate(this.declarer, 1);
		else
			return this.previousTrickWinner;
	}

	/**
	 * Returns the seat of the player who's turn it is to play
	 */
	get nextPlayer() {
		if (!this.biddingHasEnded)
			return Seat.rotate(this.boardState.dealer, this.boardState.bids.length);
		else if (!this.lastCall)
			return undefined;
		else
			return Seat.rotate(this.leader, this.currentTrick.length);
	}

	/*
	 * Returns an array of the cards which can legally be played
	 */
	get legalCards() {
		let hand = this.boardState.hands[this.nextPlayer];
		let available = hand.filter((card) => !this.hasBeenPlayed(card));

		let trick = this.currentTrick;

		if ((trick.length > 0) && (trick.length < 4)) {
			let lead = trick[0].card;
			let followers = available.filter((card) => (card.suit === lead.suit));

			if (followers.length > 0)
				return followers;
		}

		return available;
	}

	/*
	 * Returns an array of the cards which can legally be played
	 */
	getLegalBids() {
		return Bid.all().filter((bid) => !validateBid(bid, this));
	}

	/*
	 * Converts the hands to their PBN string
	 */
	toPBN() {
		var result = Seat.toPBNString(this.dealer) + ':';

		Seat.all().forEach((s, i) => {
			let seat = Seat.rotate(this.dealer, i);
			let cards = this.hands[seat]
				.filter(card => !this.hasBeenPlayed(card));
			result = result + Card.toPBN(cards) + " ";
		});

		return result.trim();
	}
}
