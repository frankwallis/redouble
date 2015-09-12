import {Card, Suit, Pip} from '../card';
import {BidSuit} from '../bid';

describe("Card", () => {

	beforeEach(() => {});

	describe("compare", () => {
		it("recognises equality", () => {
			let card1 = { suit: Suit.Clubs, pip: Pip.Three };
			let card2 = { suit: Suit.Clubs, pip: Pip.Three };
			expect(Card.compare(card1, card2)).to.equal(0);
			expect(Card.compare(card2, card1)).to.equal(0);
		});

		it("obeys order of precedence of pips", () => {
			let card1 = { suit: Suit.Clubs, pip: Pip.Three };
			let card2 = { suit: Suit.Clubs, pip: Pip.Four };
			expect(Card.compare(card1, card2)).to.be.lessThan(0);
			expect(Card.compare(card2, card1)).to.be.greaterThan(0);

			card1.pip = Pip.King;
			card2.pip = Pip.Ace;
			expect(Card.compare(card1, card2)).to.be.lessThan(0);
			expect(Card.compare(card2, card1)).to.be.greaterThan(0);

			card1.pip = Pip.Nine;
			card2.pip = Pip.Jack;
			expect(Card.compare(card1, card2)).to.be.lessThan(0);
			expect(Card.compare(card2, card1)).to.be.greaterThan(0);
		});

		it("obeys order of precedence of suits", () => {
			let card1 = { suit: Suit.Clubs, pip: Pip.Three };
			let card2 = { suit: Suit.Diamonds, pip: Pip.Three };
			expect(Card.compare(card1, card2)).to.be.lessThan(0);
			expect(Card.compare(card2, card1)).to.be.greaterThan(0);

			card1.suit = Suit.Diamonds;
			card2.suit = Suit.Hearts;
			expect(Card.compare(card1, card2)).to.be.lessThan(0);
			expect(Card.compare(card2, card1)).to.be.greaterThan(0);

			card1.suit = Suit.Hearts;
			card2.suit = Suit.Spades;
			expect(Card.compare(card1, card2)).to.be.lessThan(0);
			expect(Card.compare(card2, card1)).to.be.greaterThan(0);
		});

		it("uses trump-suit when provided", () => {
			let card1 = { suit: Suit.Clubs, pip: Pip.Three };
			let card2 = { suit: Suit.Hearts, pip: Pip.Five };

			expect(Card.compare(card1, card2)).to.be.lessThan(0);
			expect(Card.compare(card1, card2, Suit.Clubs)).to.be.greaterThan(0);
			expect(Card.compare(card2, card1, Suit.Clubs)).to.be.lessThan(0);
		});

		it("uses lead-suit when provided", () => {
			let card1 = { suit: Suit.Clubs, pip: Pip.Three };
			let card2 = { suit: Suit.Hearts, pip: Pip.Five };

			expect(Card.compare(card1, card2)).to.be.lessThan(0);
			expect(Card.compare(card1, card2, Suit.Diamonds, Suit.Clubs)).to.be.greaterThan(0);
		});

		it("sorts correctly", () => {
			let cards = [
				{ suit: Suit.Diamonds, pip: Pip.Two },
				{ suit: Suit.Hearts, pip: Pip.Nine },
				{ suit: Suit.Hearts, pip: Pip.Five },
				{ suit: Suit.Spades, pip: Pip.Ace }
			];
			let sorted = cards.sort((card1, card2) => Card.compare(card1, card2, Suit.Diamonds, BidSuit.Clubs));
			expect(sorted[3].suit).to.equal(Suit.Diamonds);
		});
	});

	describe("create", () => {
		it("creates cards correctly", () => {
			let card = Card.create("2S");
			expect(card.suit).to.equal(Suit.Spades);
			expect(card.pip).to.equal(Pip.Two);

			card = Card.create("JD");
			expect(card.suit).to.equal(Suit.Diamonds);
			expect(card.pip).to.equal(Pip.Jack);

			card = Card.create("AC");
			expect(card.suit).to.equal(Suit.Clubs);
			expect(card.pip).to.equal(Pip.Ace);
		});

		it("creates hands correctly", () => {
			let hand = Card.createAll("2S", "3S");
			expect(hand.length).to.equal(2);
			expect(hand[0].pip).to.equal(Pip.Two);
			expect(hand[1].pip).to.equal(Pip.Three);
		});

		it("creates multiple hands correctly", () => {
			let hands = Card.createAll(["3H", "5H"], ["2S", "3S"]);
			expect(hands.length).to.equal(2);
			expect(hands[1].length).to.equal(2);
			expect(hands[1][0].pip).to.equal(Pip.Two);
			expect(hands[1][1].pip).to.equal(Pip.Three);
		});
	});

	describe("suitName", () => {
		it("returns correct values", () => {
			expect(Card.suitName(Suit.Hearts)).to.equal("hearts");
			expect(Card.suitName(Suit.Clubs)).to.equal("clubs");
		});
	});

	describe("pipName", () => {
		xit("returns correct values", () => {
			expect(Card.pipName(Pip.Ace)).to.equal("A");
			expect(Card.pipName(Pip.Ten)).to.equal("10");
			expect(Card.pipName(Pip.Nine)).to.equal("9");
			expect(Card.pipName(Pip.Two)).to.equal("2");
		});
	});

});
