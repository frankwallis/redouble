/* @flow */

import {Deck} from "../core/deck";
import {Seat, rotate} from "../core/seat";
import {BidType} from "../core/bid";

export class GameStateHelper {

   constructor(gameState: tower.IGameState) {
      this.gameState = gameState || { boards: [] };
   }

   get currentBoard(): IBoard {
      return this.gameState.boards[this.gameState.boards.length -1];
   }

   get currentTrick(): Array<Card> {
      var played = this.currentBoard.cards.length % 4;
      return this.currentBoard.cards.slice(played * -1);
   }

   get lastBid(): Bid {
      return this.currentBoard.bids[this.currentBoard.bids.length -1];
   }

   get trumpSuit(): Suit {
      if (this.biddingHasEnded)
         return this.currentBoard.bids[this.currentBoard.bids.length -4].suit;
   }

   get biddingHasEnded(): boolean {
      var consecutivePasses = 0;
      var idx = this.currentBoard.bids.length - 1;

      while(idx >= 0) {
         if (this.currentBoard.bids[idx].type == BidType.NoBid)
            consecutivePasses ++;
         else
            break;

         idx --;
      }
      return (consecutivePasses >= 3) && (this.currentBoard.bids.length > 3);
   }

   get playHasEnded(): boolean {
      return (this.currentBoard.cards.length == 52);
   }

   hasBeenPlayed(card) {
      return this.currentBoard.cards
         .some((played) => (played.pip == card.pip) && (played.suit == card.suit));
   }

   get gameHasEnded(): boolean {
      return false;
   }

   getRubberScore(): any {
      return undefined;
   }

   get nextPlayer(): tower.Seat {
      if (this.biddingHasEnded)
         return rotate(this.currentBoard.leader, this.currentBoard.cards.length);
      else
         return rotate(this.currentBoard.dealer, this.currentBoard.bids.length);
   }

   validateBid(bid: tower.IBid) {
      switch(bid.type) {
         case BidType.NoBid:
            return;

         case BidType.Double:
            if (!this.lastAction || (this.lastAction.type != BidType.Call))
               throw new Error("invalid double");
            else
               return;

         case BidType.Redouble:
            if (!this.lastAction || (this.lastAction.type != BidType.Double))
               throw new Error("invalid redouble");
            else
               return;

         case BidType.Call: {
            if ((!bid.level) || (!bid.suit))
               throw new Error("you must provide level and suit");
            else if (this.lastBid) {
               if ((bid.level  < this.lastBid.level) ||
                   (bid.level == this.lastBid.level) && (bid.suit < this.lastBid.suit))
                  throw new Error("bid must be higher than " + this.lastBid);
            }
            return;
         }
      }
   }

   validateCard(card: tower.ICard) {

   }

   clone(): GameStateHelper {
      var newstate = JSON.parse(JSON.stringify(this.gameState));
      return new GameStateHelper(newstate);
   }

   newBoard(): GameStateHelper {
      var deck = new Deck();
      deck.shuffle();

      var hands = deck.deal(4);
      var board = {
         dealer: Seat.North, // TODO
         hands: hands,
         bids: [],
         cards: []
      }

      var result = this.clone();
      result.gameState.boards.push(board);
      return result;
   }


}
