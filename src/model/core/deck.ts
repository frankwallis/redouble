import {Suit, Pip, Card} from "./card";
import {Seat} from "./seat";

export type Hand = Array<Card>

export class Deck {

	constructor() {
		this.cards = this.createCards();
	}

	cards: Array<Card>;

	createCards(): Array<Card> {
		const result = [];

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
	deal(dealer: Seat): Record<Seat, Hand> {
		const result: Record<Seat, Hand> = {
			[Seat.North]: [],
			[Seat.South]: [],
			[Seat.East]: [],
			[Seat.West]: [],
		};
		let current = Seat.rotate(dealer, 1);

		this.cards.forEach((card) => {
			result[current].push(card);
			current = Seat.rotate(current, 1);
		});

		return result;
	}

	/**
	 * rigs the returned hands
	 * pbn should be a valid pbn string
	 */
	static fromPBN(pbn: string) {
		const result: Record<Seat, Hand> = {
			[Seat.North]: [],
			[Seat.South]: [],
			[Seat.East]: [],
			[Seat.West]: [],
		};
		const parts = pbn.split(":").map(part => part.trim());
		const dealer = Seat.fromPBNString(parts[0]);
		const hands = parts[1].split(" ").map(part => part.trim());

		Seat.all().forEach((_1, i) => {
			const current = Seat.rotate(dealer, i);
			const holdings = hands[i].split(".");

			Suit.all().forEach((_2, j) => {
				const suit = Suit.fromPBN(j);

				const holding = holdings[j].split("").map(pipName => {
					const pip = Pip.fromPBNString(pipName);
					return {pip, suit};
				});

				result[current] = result[current].concat(holding);
			});
		});

		return result;
	}

}
