/// <reference path="../../_references.d.ts" />

import {Suit, Pip, Card, ICard} from "./card";

export class Deck {

   constructor() {
      this.cards = this.createCards();
   }

   cards: Array<any>;

   createCards(): Array<ICard> {
      var result = [];

      for (var asuit = Suit.Clubs; asuit <= Suit.Spades; asuit++) {
         for (var apip = Pip.Two; apip <= Pip.Ace; apip++) {
            result.push({ suit: asuit, pip: apip });
         }
      }

      return result;
   }

   shuffleCards(array: Array<ICard>): Array<ICard> {
      var i = array.length, j, swap;

      while (--i) {
         j = Math.random() * (i + 1) | 0;
         swap = array[i];
         array[i] = array[j];
         array[j] = swap;
      }

      return array;
   }

   shuffle() {
      this.cards = this.shuffleCards(this.cards);
   }

   deal(hands: number): Array<Array<ICard>> {

      var current = 0;
      var result = [];

      while (current < this.cards.length) {
         var hand = current % hands;

         if (!result[hand])
            result[hand] = [];

         result[hand].push(this.cards[current]);

         current ++;
      }

      return result;
   }
}
