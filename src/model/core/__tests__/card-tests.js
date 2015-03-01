jest.autoMockOff()

import {Card, Suit, Pip} from '../card';

describe("Card", () => {

   beforeEach(() => {});

   describe("compare", () => {
      it("recognises equality", () => {
         var card1 = { suit: Suit.Clubs, pip: Pip.Three };
         var card2 = { suit: Suit.Clubs, pip: Pip.Three };
         expect(Card.compare(card1, card2)).toBe(0);
         expect(Card.compare(card2, card1)).toBe(0);
      });

      it("obeys order of precedence of pips", () => {
         var card1 = { suit: Suit.Clubs, pip: Pip.Three };
         var card2 = { suit: Suit.Clubs, pip: Pip.Four };
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
         var card1 = { suit: Suit.Clubs, pip: Pip.Three };
         var card2 = { suit: Suit.Diamonds, pip: Pip.Three };
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
         var card1 = { suit: Suit.Clubs, pip: Pip.Three };
         var card2 = { suit: Suit.Hearts, pip: Pip.Five };

         expect(Card.compare(card1, card2)).toBeLessThan(0);
         expect(Card.compare(card1, card2, Suit.Clubs)).toBeGreaterThan(0);
      });

      it("uses lead-suit when provided", () => {
         var card1 = { suit: Suit.Clubs, pip: Pip.Three };
         var card2 = { suit: Suit.Hearts, pip: Pip.Five };

         expect(Card.compare(card1, card2)).toBeLessThan(0);
         expect(Card.compare(card1, card2, Suit.Diamonds, Suit.Clubs)).toBeGreaterThan(0);
      });
   });

   describe("stringify", () => {
      it("returns unique values", () => {

      });
   });
});