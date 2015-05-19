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
      let call = this.lastCall;
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
      let act = this.lastAction;
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
      let consecutivePasses = 0;
      let idx = this.currentBoard.bids.length - 1;

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
      let played = this.currentBoard.cards.length % 4;
      played = played || 4;
      return this.currentBoard.cards.slice(played * -1);
   }

   /* 
    * Returns the winner of the previous trick
    */
   get previousTrickWinner(): Seat {
      if (this.currentBoard.cards.length < 4) return undefined;
      let played = this.currentBoard.cards.length % 4;
      let trick = this.currentBoard.cards.slice(this.currentBoard.cards.length - played - 4, this.currentBoard.cards.length - played);

      let winner = trick.sort((played1, played2) => {
        return Card.compare(played1.card, played2.card, this.trumpSuit, trick[0].card.suit);
      })[3].seat;

      return winner;
   }

   get declarerTricks(): number {
      let trickCount = Math.floor(this.currentBoard.cards.length / 4);
      let result = 0;
      
      for (let i = 0; i < trickCount; i ++) {
         let trick = this.currentBoard.cards.slice(i * 4, (i * 4) + 4);
         
         //console.log('' + i + ': ' + 'len= ' + trick.length + ' / ' + this.currentBoard.cards.length);
         let winner = trick.sort((played1, played2) => {
           return Card.compare(played1.card, played2.card, this.trumpSuit, trick[0].card.suit);
         })[3].seat;
         
         if ((winner == this.declarer) || Seat.isPartner(this.declarer, winner))
            result ++;
      }

      return result;
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
         .some((played) => Card.equals(card, played.card));
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
        for (let i = 0; i < this.currentBoard.bids.length -1; i ++)
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

   /*
    * Returns an array of the cards which can legally be played
    */
   get legalCards(): Array<ICard> {
      let hand = this.currentBoard.hands[this.nextPlayer];
      let available = hand.filter((card) => !this.hasBeenPlayed(card));
   
      let trick = this.currentTrick;
   
      if ((trick.length > 0) && (trick.length < 4)) {
         let lead = trick[0].card;
         let followers = available.filter((card) => (card.suit == lead.suit));
      
         if (followers.length > 0)
            return followers;
      }
      
      return available;
   }

   /**
    * Creates an identical copy of itself
    */
   clone(): GameStateHelper {
      let newstate = JSON.parse(JSON.stringify(this.gameState));
      return new GameStateHelper(newstate);
   }

   /**
    * Starts a new board
    */
   newBoard(dealer: Seat): GameStateHelper {
      // TODO remove this
      dealer = dealer || Seat.North;

      let deck = new Deck();
      deck.shuffle();

      let hands = {};
      deck.deal(4).forEach((hand, idx) => {
        hands[Seat.rotate(dealer, idx + 1)] = hand;
      });

      let board = {
         dealer: dealer,
         hands: hands,
         bids: [],
         cards: []
      }

      let result = this.clone();
      result.gameState.boards.push(board);
      return result;
   }

   /**
    * Called in response to a player playing a card.
    * If the bid is valid returns the new state-helper,
    * otherwise an exception is thrown
    */
   makeBid(bid: Bid): GameStateHelper {
      let err = validateBid(bid, this);
      if (err) throw err;

      let newstate = this.clone();
      newstate.currentBoard.bids.push(bid);
      return newstate;
   }

   /**
    * Called in response to a player making a bid.
    * If the card is valid returns the new state-helper,
    * otherwise an exception is thrown
    */
   playCard(card: Card): GameStateHelper {
      let err = validateCard(card, this);
      if (err) throw err;

      let newstate = this.clone();
      newstate.currentBoard.cards.push({"seat": this.nextPlayer, "card": card });
      return newstate;
   }

}

export class Game extends GameStateHelper {

}