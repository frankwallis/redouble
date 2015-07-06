jest.autoMockOff()

import {Card, Suit, Pip} from '../card';

describe("Card", () => {

   beforeEach(() => {});

   describe("compare", () => {
      it("recognises equality", () => {
         let card1 = { suit: Suit.Clubs, pip: Pip.Three };
         let card2 = { suit: Suit.Clubs, pip: Pip.Three };
         expect(Card.compare(card1, card2)).toBe(0);
         expect(Card.compare(card2, card1)).toBe(0);
      });

      it("obeys order of precedence of pips", () => {
         let card1 = { suit: Suit.Clubs, pip: Pip.Three };
         let card2 = { suit: Suit.Clubs, pip: Pip.Four };
         expect(Card.compare(card1, card2)).toBeLessThan(0);
         expect(Card.compare(card2, card1)).toBeGreaterThan(0);

         card1.pip = Pip.King;
         card2.pip = Pip.Ace;
         expect(Card.compare(card1, card2)).toBeLessThan(0);
         expect(Card.compare(card2, card1)).toBeGreaterThan(0);

         card1.pip = Pip.Nine;
         card2.pip = Pip.Jack;
         expect(Card.compare(card1, card2)).toBeLessThan(0);
         expect(Card.compare(card2, card1)).toBeGreaterThan(0);
      });

      it("obeys order of precedence of suits", () => {
         let card1 = { suit: Suit.Clubs, pip: Pip.Three };
         let card2 = { suit: Suit.Diamonds, pip: Pip.Three };
         expect(Card.compare(card1, card2)).toBeLessThan(0);
         expect(Card.compare(card2, card1)).toBeGreaterThan(0);

         card1.suit = Suit.Diamonds;
         card2.suit = Suit.Hearts;
         expect(Card.compare(card1, card2)).toBeLessThan(0);
         expect(Card.compare(card2, card1)).toBeGreaterThan(0);

         card1.suit = Suit.Hearts;
         card2.suit = Suit.Spades;
         expect(Card.compare(card1, card2)).toBeLessThan(0);
         expect(Card.compare(card2, card1)).toBeGreaterThan(0);
      });

      it("uses trump-suit when provided", () => {
         let card1 = { suit: Suit.Clubs, pip: Pip.Three };
         let card2 = { suit: Suit.Hearts, pip: Pip.Five };

         expect(Card.compare(card1, card2)).toBeLessThan(0);
         expect(Card.compare(card1, card2, Suit.Clubs)).toBeGreaterThan(0);
         expect(Card.compare(card2, card1, Suit.Clubs)).toBeLessThan(0);
      });

      it("uses lead-suit when provided", () => {
         let card1 = { suit: Suit.Clubs, pip: Pip.Three };
         let card2 = { suit: Suit.Hearts, pip: Pip.Five };

         expect(Card.compare(card1, card2)).toBeLessThan(0);
         expect(Card.compare(card1, card2, Suit.Diamonds, Suit.Clubs)).toBeGreaterThan(0);
      });

   });

   describe("create", () => {
      it("creates cards correctly", () => {
         let card = Card.create("2S");
         expect(card.suit).toBe(Suit.Spades);
         expect(card.pip).toBe(Pip.Two);

         card = Card.create("JD");
         expect(card.suit).toBe(Suit.Diamonds);
         expect(card.pip).toBe(Pip.Jack);

         card = Card.create("AC");
         expect(card.suit).toBe(Suit.Clubs);
         expect(card.pip).toBe(Pip.Ace);
      });

      it("creates hands correctly", () => {
         let hand = Card.createAll("2S", "3S");
         expect(hand.length).toBe(2);
         expect(hand[0].pip).toBe(Pip.Two);
         expect(hand[1].pip).toBe(Pip.Three);
      });

      it("creates multiple hands correctly", () => {
         let hands = Card.createAll(["3H", "5H"], ["2S", "3S"]);
         expect(hands.length).toBe(2);
         expect(hands[1].length).toBe(2);
         expect(hands[1][0].pip).toBe(Pip.Two);
         expect(hands[1][1].pip).toBe(Pip.Three);
      });
   });

   describe("stringify", () => {
      it("returns unique values", () => {

      });
   });
});
