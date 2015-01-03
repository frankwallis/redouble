declare module tower {

	enum Suit {
		Clubs = 1, Diamonds = 2, Hearts = 3, Spades = 4
	}

	enum Pip {
		Two = 2, Three = 3, Four = 4, Five = 5, Six = 6, Seven = 7, Eight = 8, Nine = 9, Ten = 10, Jack = 11, Queen = 12, King = 13, Ace = 14
	}

	interface ICard {
		pip: Pip;
		suit: Suit;
	}

	interface IDeck {
		shuffle();
		deal(hands: number): Array<Array<ICard>>; 
	}
}