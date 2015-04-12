/* @flow */

import {Deck} from "../core/deck";
import {Seat} from "../core/seat";
import {Bid, BidType, BidSuit} from "../core/bid";
import {Card, Pip, Suit} from "../core/card";
import {GameScorer} from "./game-scorer";
import {validateBid, validateCard} from "./validators";

/** 
 * Helper class for analysing game-state.
 * This class is designed to be immutable from the outside
 */
export class GameStateHelper {

   constructor(gameState: tower.IGameState) {
      this.gameState = gameState || { boards: [] };
   }

   /**
    * Returns the current board
    */
   get currentBoard(): IBoard {
      return this.gameState.boards[this.gameState.boards.length -1];
   }

   /**
    * Returns the last bid to be made of any type
    */
   get lastBid(): Bid {
      return this.currentBoard.bids[this.currentBoard.bids.length -1];
   }

   /**
    * Returns the last bid to be made of type Bid.Call
    */
   get lastCall(): Bid {
      return this.currentBoard.bids
         .reduce((current, bid) => {
            if (bid.type == BidType.Call)
               return bid;
            else
               return current;
         }, undefined);
   }

   /**
    * Returns the player who made the lastCall
    */
   get lastCaller(): Seat {
      var call = this.lastCall;
      if (call) return Seat.rotate(this.currentBoard.dealer, this.currentBoard.bids.indexOf(call));
   }

   /**
    * Returns the last bid to be made which was not a no-bid
    */
   get lastAction(): Bid {
      return this.currentBoard.bids
         .reduce((current, bid) => {
            if (bid.type != BidType.NoBid)
               return bid;
            else
               return current;
         }, undefined);
   }

   /**
    * Returns the seat whic made the lastAction
    */
   get lastActor(): Seat {
      var act = this.lastAction;
      if (act) return Seat.rotate(this.currentBoard.dealer, this.currentBoard.bids.indexOf(act));
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
      return (consecutivePasses >= 3) && (this.currentBoard.bids.length >= 4);
   }

   /**
    * Returns the current trick, which will be an array of the cards which have been
    * played to the trick, starting with the lead card. If no cards have been played
    * yet it returns an empty array.
    */
   get currentTrick(): Array<Card> {
      var played = this.currentBoard.cards.length % 4;
      played = played || 4;
      return this.currentBoard.cards.slice(played * -1);
   }

   get previousTrickWinner(): Seat {
      if (this.currentBoard.cards.length < 4) return undefined;
      var played = this.currentBoard.cards.length % 4;
      var trick = this.currentBoard.cards.slice(this.currentBoard.cards.length - played - 4, this.currentBoard.cards.length - played);

      var winner = trick.sort((played1, played2) => {
        return Card.compare(played1.card, played2.card, this.trumpSuit, trick[0].card.suit);
      })[3].seat;

      return winner;
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
         .some((played) => !Card.compare(card, played.card));
   }

   /**
    * Returns true if one team has won the game
    */
   get gameHasEnded(): boolean {
      return false;
   }

   /**
    * Returns the seat of the lead card
    */
   get declarer(): Seat {
      if (!this.biddingHasEnded)
         throw new Error("the bidding has not ended yet");

      if (this.lastCall) {
        for (var i = 0; i < this.currentBoard.bids.length -1; i ++)
           if (this.currentBoard.bids[i].suit == this.lastCall.suit)
              return Seat.rotate(this.currentBoard.dealer, i);
      }

      throw new Error("declarer not found");
   }

   get leader(): Seat {
      if (this.currentBoard.cards.length < 4)
        return Seat.rotate(this.declarer, 1);
      else
        return this.previousTrickWinner;
   }

   /**
    * Returns the seat of the player who's turn it is to play
    */
   get nextPlayer(): tower.Seat {
      if (!this.biddingHasEnded)
         return Seat.rotate(this.currentBoard.dealer, this.currentBoard.bids.length);
      else if (!this.lastCall)
         return undefined;
      else
         return Seat.rotate(this.leader, this.currentTrick.length);
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
   newBoard(dealer: Seat): GameStateHelper {
      // TODO remove this
      dealer = dealer || Seat.North;

      var deck = new Deck();
      deck.shuffle();

      var hands = {};
      deck.deal(4).forEach((hand, idx) => {
        hands[Seat.rotate(dealer, idx + 1)] = hand;
      });

      var board = {
         dealer: dealer,
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
   makeBid(bid: Bid): GameStateHelper {
      var err = validateBid(bid, this);
      if (err) throw err;

      var newstate = this.clone();
      newstate.currentBoard.bids.push(bid);
      return newstate;
   }

   /**
    * Called in response to a player making a bid.
    * If the card is valid returns the new state-helper,
    * otherwise an exception is thrown
    */
   playCard(card: Card): GameStateHelper {
      var err = validateCard(card, this);
      if (err) throw err;

      var newstate = this.clone();
      newstate.currentBoard.cards.push({"seat": this.nextPlayer, "card": card });
      return newstate;
   }

}

export class Game extends GameStateHelper {

}