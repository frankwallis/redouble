/* @flow */

import {BidSuit, BidType, Bid} from "../../core/bid";
import {Game} from "../../game/game-state";

export class BiddingStrategy {

   constructor() {}
   
   getBid(gameState): tower.IBid {
      let game = new Game(gameState);
   
      if (!game.currentBoard.lastCall) {
         return {type: BidType.NoBid};
      }
      else if ((game.currentBoard.bids.length > 0) &&
               (game.currentBoard.bids.length < 4)) {
         return {
            type: BidType.Call,
            suit: game.currentBoard.lastCall.suit +1 || BidSuit.Clubs,
            level: game.currentBoard.lastCall.level +1 || 1
         };
      }
      else {
         return {type: BidType.NoBid};
      }
   }
}
