/* @flow */

import {Node} from "./mcts-node";
import {GameStateHelper} from "../../game/game-state";

export class CardplayStrategy {

   constructor() {
      this.boards = {};
      this.rootNode = undefined;      
   }

   updateGameState(gameState) {
      var game = new GameStateHelper(gameState);
      if (game.biddingHasEnded) // TODO
         this.rootNode = this.getRootNode(game);
   }
   
   getCard() {
      this.visit(100);
	   return Promise.resolve(this.rootNode.bestCard());
   }
   
   visit(rounds) {
      rounds = rounds || 1;
      for (let round = 0; round < rounds; round += 1)
         this.rootNode.visit();
   }

   getRootNode(game) {
      let key = JSON.stringify(game.currentBoard.hands);
      
      if (!this.boards[key])
         this.boards[key] = new Node(null, game, null); 
      
      return this.boards[key].seek(game.currentBoard.cards);
   }
}
