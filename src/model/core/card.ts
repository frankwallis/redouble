/// <reference path="../../_references.d.ts" />

export const Suit = {
   "Clubs": 1,
   "Diamonds": 2,
   "Hearts": 3,
   "Spades": 4
};

export const Pip = {
   "Two": 2, "Three": 3, "Four": 4, "Five": 5,
   "Six": 6, "Seven": 7, "Eight": 8, "Nine": 9, "Ten": 10,
   "Jack": 11, "Queen": 12, "King": 13, "Ace": 14
};

 export interface ICard {
    suit: number;
    pip: number;
 }

export class Card {
   static compare(card1: ICard, card2: ICard, trumpSuit?: number, leadSuit?: number): number {
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

   static create(card: string): ICard {
      var shortSuitNames = [ "", "C", "D", "H", "S"];
      var shortPipNames = [ "", "", "2", "3", "4", "5", "6", "7", "8", "9", "T", "J", "Q", "K", "A" ];

      return {
         pip: shortPipNames.indexOf(card[0].toUpperCase()),
         suit: shortSuitNames.indexOf(card[1].toUpperCase())
      };
   }

}

export function suitName(suit) {
   var suitNames = [ "", "clubs", "diamonds", "hearts", "spades"];
   return suitNames[suit];
}

export function pipName(pip) {
  switch(pip) {
      case Pip.Ace: return "A";
      case Pip.King: return "K";
      case Pip.Queen: return "Q";
      case Pip.Jack: return "J";
      default: return pip.toString();
  }
}
