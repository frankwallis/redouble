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

		for (let suit = Suit.Clubs; suit <= Suit.Spades; suit++) {
			for (let pip = Pip.Two; pip <= Pip.Ace; pip++) {
				result.push({ suit, pip });
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
	 * pbn should be a valid pbn string
	 */
	static fromPBN(pbn) {
		let result = {};
		let parts = pbn.split(":").map(part => part.trim());

		let dealer = Seat.fromPBNString(parts[0]);
		let hands = parts[1].split(" ").map(part => part.trim());

		Seat.all().forEach((_1, i) => {
			let current = Seat.rotate(dealer, i);
			result[current] = [];

			let holdings = hands[i].split(".");

			Suit.all().forEach((_2, j) => {
				let suit = Suit.fromPBN(j);

				let holding = holdings[j].split("").map(pipName => {
					let pip = Pip.fromPBNString(pipName);
					return {pip, suit};
				});

				result[current] = result[current].concat(holding);
			});
		});

		return result;
	}

}
