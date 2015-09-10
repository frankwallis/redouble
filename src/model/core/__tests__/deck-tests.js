import {Deck} from '../deck';
import {Seat} from '../seat';
import {Pip} from '../card';

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

	it("rigs hands correctly", () => {
		let hands = Deck.rig(Seat.South, ["3H", "5H"], ["2S", "3S"], ["7C", "8C"], ["2D", "3D"]);
		expect(hands[Seat.North].length).to.equal(2);
		expect(hands[Seat.North][0].pip).to.equal(Pip.Two);
		expect(hands[Seat.North][1].pip).to.equal(Pip.Three);
	});
});
