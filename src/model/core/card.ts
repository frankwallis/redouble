export enum Suit {
	Clubs = 1,
	Diamonds = 2,
	Hearts = 3,
	Spades = 4
}

export namespace Suit {
	export const all = () => [4, 3, 2, 1];
	export const fromPBN = (idx: number) => PBNSuitMap[idx];
	export const toPBN = (suit: Suit) => PBNSuitMap.indexOf(suit);
	export const fromPBNString = (pbn: string) => PBNSuitStringMap.indexOf(pbn);
	export const toPBNString = (suit: Suit) => PBNSuitStringMap[suit];
};

const PBNSuitMap = [Suit.Spades, Suit.Hearts, Suit.Diamonds, Suit.Clubs];
const PBNSuitStringMap = ["", "C", "D", "H", "S"];

export const Pip = {
	Two: 2, Three: 3, Four: 4, Five: 5,
	Six: 6, Seven: 7, Eight: 8, Nine: 9, Ten: 10,
	Jack: 11, Queen: 12, King: 13, Ace: 14,
	fromPBN: (idx: number) => idx,
	toPBN: (pip: number) => pip,
	toPBNString: (pip: number) => PBNPipStringMap[pip],
	fromPBNString: (pbn: string) => PBNPipStringMap.indexOf(pbn)
};

const PBNPipStringMap = [ "", "", "2", "3", "4", "5", "6", "7", "8", "9", "T", "J", "Q", "K", "A" ];

export interface Card {
	suit: Suit;
	pip: number;
}

export namespace Card {
	export function compare(card1: Card, card2: Card, trumpSuit?: Suit, leadSuit?: Suit): number {
		if (card1.suit === card2.suit) {
			return card1.pip - card2.pip;
		}
		else {
			if (trumpSuit) {
				if(card1.suit === trumpSuit)
					return 1;
				else if(card2.suit === trumpSuit)
					return -1;
			}

			if (leadSuit) {
				if(card1.suit === leadSuit)
					return 1;
				else if(card2.suit === leadSuit)
					return -1;
			}

			return card1.suit - card2.suit;
		}
	}

	export function equals(card1: Card, card2: Card): boolean {
		return !Card.compare(card1, card2);
	}

	/*
	 * creates a card from a string e.g. "5H"
	 */
	export function create(card: string) {
		if (typeof card !== "string") return card;

		let shortSuitNames = [ "", "C", "D", "H", "S"];
		let shortPipNames = [ "", "", "2", "3", "4", "5", "6", "7", "8", "9", "T", "J", "Q", "K", "A" ];

		return {
			pip: shortPipNames.indexOf(card[0].toUpperCase()),
			suit: shortSuitNames.indexOf(card[1].toUpperCase())
		}
	}

	export function toString(card: Card) {
		let shortSuitNames = [ "", "C", "D", "H", "S" ];
		let shortPipNames = [ "", "", "2", "3", "4", "5", "6", "7", "8", "9", "T", "J", "Q", "K", "A" ];
		return shortPipNames[card.pip] + shortSuitNames[card.suit];
	}

	/*
	 * creates an array of cards or hands.
	 * takes a variable length argument list of strings or arrays e.g. "5H", "6H" or ["5H"], ["6H"] etc
	 */
	// export function createAll(...args) {
	// 	let result = [];

	// 	for (let i = 0; i < args.length; i ++) {
	// 		if (Array.isArray(args[i]))
	// 			result.push(Card.createAll.apply(Card, args[i]));
	// 		else
	// 			result.push(Card.create(args[i]));
	// 	}

	// 	return result;
	// }

	export function suitName(suit: Suit) {
		const suitNames = [ "", "clubs", "diamonds", "hearts", "spades"];
		return suitNames[suit];
	}

	export function pipName(pip: number) {
		switch(pip) {
			case Pip.Ace: return "A";
			case Pip.King: return "K";
			case Pip.Queen: return "Q";
			case Pip.Jack: return "J";
			case Pip.Ten: return "10";
			default: return pip.toString();
		}
	}

	export function toPBN(cards: Card[]) {
		return Suit.all().reduce((result, suit) => {
			let holding = cards
				.filter(card => card.suit === suit)
				.sort((card1, card2) => Card.compare(card2, card1))
				.map(card => Pip.toPBNString(card.pip))
				.join("");

			return result + holding + (suit === Suit.Clubs ? "" : ".");
		}, "");
	}
}
