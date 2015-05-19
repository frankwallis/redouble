/* @flow */

import {Node} from "./mcts-node";

export class CardplayStrategy {

   constructor() {
      this.boards = {};
      this.rounds = 100;
   }

   getCard(game): tower.ICard {
      var rootNode = this.getRootNode(game);
      
      for (let round = 0; round < this.rounds; round += 1)
         rootNode.visit();
      
      //console.log(JSON.stringify(rootNode));
	   return rootNode.bestCard();
   }
   
   getRootNode(game) {
      let key = JSON.stringify(game.currentBoard.hands);
      
      if (!this.boards[key])
         this.boards[key] = new Node(null, game, null); 
      
      return this.boards[key].seek(game.currentBoard.cards);
   }
}
