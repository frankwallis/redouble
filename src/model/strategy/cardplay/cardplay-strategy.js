/* @flow */

export class CardplayStrategy {

   constructor() {}

   getCard(game): tower.ICard {
      return game.legalCards[0];
   }
}
