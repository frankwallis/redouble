/* @flow */

export const Suit = {
   "Clubs": 1,
   "Diamonds": 2,
   "Hearts": 3,
   "Spades": 4
};

export const Pip = { "Two": 2, "Three": 3, "Four": 4, "Five": 5, "Six": 6, "Seven": 7, "Eight": 8, "Nine": 9, "Ten": 10, "Jack": 11, "Queen": 12, "King": 13, "Ace": 14 };

export class Card {
   static stringify(card): string {

   }

   static compare(card1, card2, trumpSuit, leadSuit): number {
      if (card1.suit == card2.suit) {
         return card1.pip - card2.pip;
      }
      else {
         if (trumpSuit) {
            if(card1.suit == trumpSuit)
               return 1;
            else if(card2.suit == trumpSuit)
               return -1;
         }

         if (leadSuit) {
            if(card1.suit == leadSuit)
               return 1;
            else if(card2.suit == leadSuit)
               return -1;
         }

         return card1.suit - card2.suit;
      }
   }
}
