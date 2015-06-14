/* @flow */

import {GameStateHelper} from "../../game/game-state";

export class CardplayStrategy {

   constructor() {}

   getCard(gameState): tower.ICard {
      var game = new GameStateHelper(gameState);
      return Promise.resolve(game.legalCards[0]);
   }
   
   updateGameState(gameState) {
      
   }
}
