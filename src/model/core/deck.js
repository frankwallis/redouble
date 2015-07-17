/* @flow */

import {Suit, Pip, Card} from "./card";
import {Seat} from "./seat";

export class Deck {

	constructor() {
		this.cards = this.createCards();
	}

	cards: Array<Card>;

	createCards(): Array<Card> {
		let result = [];

		for (let asuit = Suit.Clubs; asuit <= Suit.Spades; asuit++) {
			for (let apip = Pip.Two; apip <= Pip.Ace; apip++) {
				result.push({ suit: asuit, pip: apip });
			}
		}

		return result;
	}

	shuffleCards(array: Array<Card>): Array<Card> {
		let i = array.length, j, swap;

		while (--i) {
			j = Math.random() * (i + 1) | 0;
			swap = array[i];
			array[i] = array[j];
			array[j] = swap;
		}

		return array;
	}

	shuffle() {
		this.cards = this.shuffleCards(this.cards);
	}

	/**
	 * Deals 13 cards to each player.
	 * hands are returned as a map of Seat -> Array<Card>
	 */
	deal(dealer: Seat): any {
		let result = {};
		let current = Seat.rotate(dealer, 1);

		this.cards.forEach((card) => {
			if (!result[current])
				result[current] = [];

			result[current].push(card);
			current = Seat.rotate(current, 1);
		});

		return result;
	}

	/**
	 * rigs the returned hands
	 * hands should be arrays of strings e.g. [ "5H", "6H" ]
	 */
	static rig(dealer, hand1, hand2, hand3, hand4) {
		let result = {};

		let current = Seat.rotate(dealer, 1);
		result[current] = hand1.map((card) => Card.create(card));

		current = Seat.rotate(current, 1);
		result[current] = hand2.map((card) => Card.create(card));

		current = Seat.rotate(current, 1);
		result[current] = hand3.map((card) => Card.create(card));

		current = Seat.rotate(current, 1);
		result[current] = hand4.map((card) => Card.create(card));

		return result;
	}
}
