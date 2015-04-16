jest.autoMockOff()

import {Deck} from '../deck';

describe("Deck", () => {

   let deck;

   beforeEach(() => {
      deck = new Deck();
   });

   it("should deal 4 hands of 13 cards", () => {
      let hands = deck.deal(4);
      expect(hands.length).toBe(4);

      hands.forEach((hand) => {
         expect(hand.length).toBe(13);
      })
   });

   it("should shuffle the cards", () => {
      let origHands = deck.deal(4);
      deck.shuffle();
      let newHands = deck.deal(4);

      expect(newHands.length).toBe(4);

      let different = false;

      for (let i = 0; i < newHands.length; i++) {
         for (let j = 0; j < newHands[i].length; j ++) {
            if (newHands[i][j] != origHands[i][j])
               different = true;
         }
      }

      expect(different).toBeTruthy();
   });
});
