/* @flow */

import {BidSuit, BidType, Bid} from "../../core/bid";
import {GameStateHelper} from "../../game/game-state";

export class BiddingStrategy {

   constructor() {}
   
   getBid(gameState): tower.IBid {
      let game = new GameStateHelper(gameState);
   
      if (!game.lastCall) {
         return {type: BidType.NoBid};
      }
      else if ((game.currentBoard.bids.length > 0) &&
               (game.currentBoard.bids.length < 4)) {
         return {
               type: BidType.Call,
               suit: game.lastCall.suit +1 || BidSuit.Clubs,
               level: game.lastCall.level +1 || 1
            };
      }
      else {
         return {type: BidType.NoBid};
      }
   }
}
