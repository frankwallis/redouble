/* @flow */

import {Game} from "../../game/game-state";

export class CardplayStrategy {

   constructor() {}

   getCard(): tower.ICard {
      let game = new Game(this._gameState);
      return Promise.resolve(game.currentBoard.legalCards[0]);
   }
   
   updateGameState(gameState) {
      this._gameState = gameState;
   }
}
