/* @flow */

import Immutable from "immutable";

import {Node} from "./mcts-node";
import {Seat} from "../../core/seat";
import {Game} from "../../game/game-state";
import {Board} from "../../game/board-state";

export class CardplayStrategy {

   constructor() {
      this.boards = {};
      this.rootNode = undefined;      
   }

   updateGameState(gameState) {
      let currentBoardState = gameState.boards[gameState.boards.length -1].boardState;
      let board = Board.create(currentBoardState.dealer, currentBoardState.hands, currentBoardState.bids, currentBoardState.cards);

      if (board.biddingHasEnded)
         this.rootNode = this.getRootNode(board);

      console.log('updated game state');
   }
   
   getCard() {
      this.visit(100);
      let card = this.rootNode.bestCard();
	   return Promise.resolve(card);
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
      
      return this.boards[key].seek(board.cards);
   }
}
