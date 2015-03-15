/* @flow */

import {Deck} from "../core/deck";
import {Seat} from "../core/seat";
import {Bid, BidType, BidSuit} from "../core/bid";
import {Card, Pip, Suit} from "../core/card";
import {GameScorer} from "./game-scorer";

interface ICard {

}


/**
 * Helper class for analysing game-state.
 * This class is designed to be immutable from the outside
 */
export class GameStateHelper {

   constructor(gameState) {
      this.gameState = gameState || { boards: [] };
   }

   /**
    * Returns the current board
    */
   get currentBoard(): any {
      return this.gameState.boards[this.gameState.boards.length -1];
   }

   /**
    * Returns the last bid to be made of any type
    */
   get lastBid(): any {
      return this.currentBoard.bids[this.currentBoard.bids.length -1];
   }

   /**
    * Returns the last bid to be made of type Bid.Call
    */
   get lastCall(): any {
      return this.currentBoard.bids.reduce((current, bid) => {
         if (bid.type == BidType.Call)
            return bid;
         else
            return current;
      }, undefined);
   }

   /**
    * Returns the last bid to be made which was not a no-bid
    */
   get lastAction(): any {
      return this.currentBoard.bids.reduce((current, bid) => {
         if (bid.type != BidType.NoBid)
            return bid;
         else
            return current;
      }, undefined);
   }

   /**
    * Returns the suit of the bid contract or undefined if the bidding has not ended
    */
   get trumpSuit(): BidSuit {
      if (this.biddingHasEnded && this.lastCall)
         return this.lastCall.suit;
   }

   /**
    * Returns true when no more bids can be made
    */
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

   /**
    * Returns the current trick, which will be an array of the cards which have been
    * played to the trick, starting with the lead card. If no cards have been played
    * yet it returns an empty array.
    */
   get currentTrick(): Array<any> {
      var played = this.currentBoard.cards.length % 4;
      played = played || 4;
      return this.currentBoard.cards.slice(played * -1);
   }

   /**
    * Returns true when no more cards can be played
    */
   get playHasEnded(): boolean {
      return (this.currentBoard.cards.length == 52);
   }

   /**
    * Returns true if this card has already been played
    */
   hasBeenPlayed(card) {
      return this.currentBoard.cards
         .some((played) => (played.pip == card.pip) && (played.suit == card.suit));
   }

   /**
    * Returns true if one team has won the game
    */
   get gameHasEnded(): boolean {
      return false;
   }

   /**
    * Returns the seat of the player who's turn it is to play
    */
   get nextPlayer(): any {
      if (this.biddingHasEnded)
         return Seat.rotate(this.currentBoard.leader, this.currentBoard.cards.length);
      else
         return Seat.rotate(this.currentBoard.dealer, this.currentBoard.bids.length);
   }

   /**
    * Tests if the bid is a valid one in this state and throws an exception if not
    */
   validateBid(bid: any) {
      if (this.biddingHasEnded)
         return new Error("the bidding has already ended");

      switch(bid.type) {
         case BidType.NoBid:
            return;

         case BidType.Double:
            if (!this.lastAction || (this.lastAction.type != BidType.Call))
               return new Error("invalid double");
            else
               return;

         case BidType.Redouble:
            if (!this.lastAction || (this.lastAction.type != BidType.Double))
               return new Error("invalid redouble");
            else
               return;

         case BidType.Call: {
            if ((!bid.level) || (!bid.suit))
               return new Error("you must provide level and suit");
            else if (this.lastCall) {
               if (Bid.compare(bid, this.lastCall) <= 0)
                  return new Error("bid must be higher than " + Bid.stringify(this.lastCall));
            }
            return;
         }
      }
   }

   /**
    * Tests if the card is a valid one in this state and throws an exception if not
    */
   validateCard(card: any) {

   }

   /**
    * Creates an identical copy of itself
    */
   clone(): GameStateHelper {
      var newstate = JSON.parse(JSON.stringify(this.gameState));
      return new GameStateHelper(newstate);
   }

   /**
    * Starts a new board
    */
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

   /**
    * Called in response to a player playing a card.
    * If the bid is valid returns the new state-helper,
    * otherwise an exception is thrown
    */
   makeBid(bid: any): GameStateHelper {
      var newstate = this.clone();
      newstate.currentBoard.bids.push(bid);
      return newstate;
   }

   /**
    * Called in response to a player making a bid.
    * If the card is valid returns the new state-helper,
    * otherwise an exception is thrown
    */
   playCard(card: any): GameStateHelper {
      var newstate = this.clone();
      newstate.currentBoard.cards.push(card);
      return newstate;
   }

}
