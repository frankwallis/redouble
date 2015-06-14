/* @flow */

import {Node} from "./mcts-node";
import {Game} from "../../game/game-state";
import {Board} from "../../game/board-state";

export class CardplayStrategy {

   constructor() {
      this.boards = {};
      this.rootNode = undefined;      
   }

   updateGameState(gameState) {
      let game = new Game(gameState);
      
      if (game.currentBoard.biddingHasEnded) // TODO
         this.rootNode = this.getRootNode(game.currentBoard);
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

   getRootNode(board) {
      let key = JSON.stringify(board.hands);
      
      if (!this.boards[key])
         this.boards[key] = new Node(null, board, null); 
      
      return this.boards[key].seek(board.boardState.cards);
   }
}
