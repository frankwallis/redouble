/* @flow */

export const Suit = {
	Clubs: 1,
	Diamonds: 2,
	Hearts: 3,
	Spades: 4,
	all: () => [4, 3, 2, 1],
	fromPBN: (idx) => PBNSuitMap[idx],
	toPBN: (suit) => PBNSuitMap.indexOf(suit),
	fromPBNString: (pbn) => PBNSuitStringMap.indexOf(pbn),
	toPBNString: (suit) => PBNSuitStringMap[suit]
};

const PBNSuitMap = [Suit.Spades, Suit.Hearts, Suit.Diamonds, Suit.Clubs];
const PBNSuitStringMap = ["", "C", "D", "H", "S"];

export const Pip = {
	Two: 2, Three: 3, Four: 4, Five: 5,
	Six: 6, Seven: 7, Eight: 8, Nine: 9, Ten: 10,
	Jack: 11, Queen: 12, King: 13, Ace: 14,
	fromPBN: (idx) => idx,
	toPBN: (pip) => pip,
	toPBNString: (pip) => PBNPipStringMap[pip],
	fromPBNString: (pbn) => PBNPipStringMap.indexOf(pbn)
};

const PBNPipStringMap = [ "", "", "2", "3", "4", "5", "6", "7", "8", "9", "T", "J", "Q", "K", "A" ];

export const Card = {

	compare(card1, card2, trumpSuit, leadSuit): number {
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
	},

	equals(card1, card2): boolean {
		return !Card.compare(card1, card2);
	},

	/*
	 * creates a card from a string e.g. "5H"
	 */
	create(card: string) {
		let shortSuitNames = [ "", "C", "D", "H", "S"];
		let shortPipNames = [ "", "", "2", "3", "4", "5", "6", "7", "8", "9", "T", "J", "Q", "K", "A" ];

		let result = {};
		result.pip = shortPipNames.indexOf(card[0].toUpperCase());
		result.suit = shortSuitNames.indexOf(card[1].toUpperCase());
		return result;
	},

	toString(card) {
		let shortSuitNames = [ "", "C", "D", "H", "S" ];
		let shortPipNames = [ "", "", "2", "3", "4", "5", "6", "7", "8", "9", "T", "J", "Q", "K", "A" ];
		return shortPipNames[card.pip] + shortSuitNames[card.suit];
	},

	/*
	 * creates an array of cards or hands.
	 * takes a variable length argument list of strings or arrays e.g. "5H", "6H" or ["5H"], ["6H"] etc
	 */
	createAll() {
		let result = [];

		for (let i = 0; i < arguments.length; i ++) {
			if (Array.isArray(arguments[i]))
				result.push(Card.createAll.apply(Card, arguments[i]));
			else
				result.push(Card.create(arguments[i]));
		}

		return result;
	},

	suitName(suit: Suit) {
		const suitNames = [ "", "clubs", "diamonds", "hearts", "spades"];
		return suitNames[suit];
	},

	pipName(pip) {
		switch(pip) {
			case Pip.Ace: return "A";
			case Pip.King: return "K";
			case Pip.Queen: return "Q";
			case Pip.Jack: return "J";
			case Pip.Ten: return "T";
			default: return pip.toString();
		}
	}
};
