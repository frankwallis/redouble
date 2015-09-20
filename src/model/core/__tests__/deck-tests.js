import {Deck} from '../deck';
import {Seat} from '../seat';
import {Suit, Pip} from '../card';

describe("Deck", () => {

	let deck;

	beforeEach(() => {
		deck = new Deck();
	});

	it("should deal 4 hands of 13 cards", () => {
		let hands = deck.deal(Seat.North);

		Seat.all().forEach(() => {
			expect(hands[Seat.North].length).to.equal(13);
		});
	});

	it("should shuffle the cards", () => {
		let origHands = deck.deal(Seat.North);
		deck.shuffle();
		let newHands = deck.deal(Seat.North);

		let different = false;

		for (let i = 0; i < newHands[Seat.North].length; i++) {
			if (newHands[Seat.North][i] !== origHands[Seat.North][i])
				different = true;
		}

		expect(different).to.equal(true);
	});

	it("converts from pbn strings", () => {
		let hands = Deck.fromPBN("W: .35.. 23... ...78 ..2.");
		expect(hands[Seat.North].length).to.equal(2);
		expect(hands[Seat.North][0].pip).to.equal(Pip.Two);
		expect(hands[Seat.North][0].suit).to.equal(Suit.Spades);
		expect(hands[Seat.North][1].pip).to.equal(Pip.Three);
		expect(hands[Seat.North][1].suit).to.equal(Suit.Spades);

		expect(hands[Seat.South].length).to.equal(1);
		expect(hands[Seat.South][0].pip).to.equal(Pip.Two);
		expect(hands[Seat.South][0].suit).to.equal(Suit.Diamonds);
	});

});
