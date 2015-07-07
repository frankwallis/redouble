/* @flow */

import Immutable from "immutable";

import {Seat} from "../core/seat";
import {Deck} from "../core/deck";
import {Card, Pip, Suit} from "../core/card";
import {Bid, BidType, BidSuit} from "../core/bid";
import {validateBid, validateCard} from "./validators";

/** 
 * Helper class for analysing board-state.
 */
export class Board {

   constructor(boardState: Immutable.Map) {
     	this.boardState = boardState;
   }

   static create(dealer, handlist, bids, cards) {
   	dealer = dealer || Seat.North;

   	if (!handlist) {
       	let deck = new Deck();
        	deck.shuffle();
        	handlist = deck.deal(4);
      }

      let hands = [];
      handlist.forEach((hand, idx) => {
      	hands.push([Seat.rotate(dealer, idx + 1), hand]);
      });

      bids = bids || [];
      cards = cards || [];

   	return new Board(Immutable.Map({ 
   		dealer: dealer, 
   		hands: Immutable.Map(hands),
   		bids: Immutable.List(bids), 
   		cards: Immutable.List(cards) 
   	}));
   }

   /*
   	getXXX functions are private and return Immutables.
   	properties are public and return the expected data
   */
   getDealer() {
   	return this.boardState.get("dealer");
   }
   get dealer() { return this.getDealer(); }
	
	getHands() {
   	return this.boardState.get("hands");	
   }
   get hands() { return this.getHands().toJS(); }
   
   getBids() {
   	return this.boardState.get("bids");
   }
   get bids() { return this.getBids().toJS(); }

   getCards() {
		return this.boardState.get("cards");
   }
   get cards() { return this.getCards().toJS(); }

   /**
    * Returns the current trick, which will be an array of the cards which have been
    * played to the trick, starting with the lead card. If no cards have been played
    * yet it returns an empty array.
    */
   getCurrentTrick() {
      let played = this.getCards().size % 4;
      played = played || 4;
      return this.getCards().slice(played * -1);   	
   }

   get currentTrick(): Array<Card> {
   	return this.getCurrentTrick().toJS();
   }

   /**
    * Returns the last bid to be made of any type
    */
   get lastBid(): Bid {
      return this.getBids().last();
   }

   /**
    * Returns the last bid to be made of type Bid.Call
    */
   get lastCall(): Bid {
      return this.getBids()
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
      if (call) return Seat.rotate(this.dealer, this.getBids().indexOf(call));
   }

   /**
    * Returns the last bid to be made which was not a no-bid
    */
   get lastAction(): Bid {
      return this.getBids()
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
      if (act) return Seat.rotate(this.dealer, this.getBids().indexOf(act));
   }

   /**
    * Returns the suit of the bid contract or undefined if the bidding has not ended
    * or no suit has been bid yet
    */
   get trumpSuit(): BidSuit {
      if (this.biddingHasEnded && this.lastCall)
         return this.lastCall.suit;
   }

   /**
    * Returns true when no more bids can be made
    */
   get biddingHasEnded(): boolean {
      return (this.getBids().size >= 4) && this.getBids().takeLast(3).every(bid => bid.type == BidType.NoBid);
   }

   /* 
    * Returns the winner of the previous trick
    */
   get previousTrickWinner(): Seat {
      if (this.getCards().size < 4) return undefined;
      let played = this.getCards().size % 4;
      let trick = this.getCards().slice(this.getCards().size - played - 4, this.getCards().size - played);

      let winningCard = trick.sort((played1, played2) => {
       	return Card.compare(played1.card, played2.card, this.trumpSuit, trick.first().card.suit);
      }).last();

      return winningCard.seat;
   }

   /* 
    * Returns the number of tricks declarer has won
    */
   get declarerTricks(): number {
      let trickCount = Math.floor(this.getCards().size / 4);
      let result = 0;
      
      for (let i = 0; i < trickCount; i ++) {
         let trick = this.getCards().slice(i * 4, (i * 4) + 4);
         
         let winner = trick.sort((played1, played2) => {
           return Card.compare(played1.card, played2.card, this.trumpSuit, trick.first().card.suit);
         }).last().seat;
         
         if ((winner == this.declarer) || Seat.isPartner(this.declarer, winner))
            result ++;
      }

      return result;
   }

   /**
    * Returns true when all the cards have been played
    */
   get playHasEnded(): boolean {
      return (this.getCards().size == this.getHands().reduce((total, hand) => total + hand.length, 0));
   }

   /**
    * Returns true if this card has already been played
    */
   hasBeenPlayed(card) {
      return this.getCards().some(played => Card.equals(card, played.card));
   }

   /**
    * Returns the seat of the declarer
    */
   get declarer(): Seat {
      if (!this.biddingHasEnded)
         throw new Error("the bidding has not ended yet");

      if (this.lastCall) {
      	let idx = this.getBids().findIndex(bid => bid.suit == this.lastCall.suit);
         return Seat.rotate(this.dealer, idx);
      }

      throw new Error("declarer not found");
   }

   /**
    * Returns the seat of the lead card
    */
   get leader(): Seat {
      if (this.getCards().size < 4)
       	return Seat.rotate(this.declarer, 1);
      else
        	return this.previousTrickWinner;
   }

   /**
    * Returns the seat of the player who's turn it is to play
    */
   get nextPlayer(): tower.Seat {
      if (!this.biddingHasEnded)
         return Seat.rotate(this.dealer, this.getBids().size);
      else if (!this.lastCall)
         return undefined;
      else
         return Seat.rotate(this.leader, this.getCurrentTrick().size);
   }

   /*
    * Returns an array of the cards which can legally be played
    */
   get legalCards(): Array<ICard> {
      let hand = this.hands[this.nextPlayer];
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
    * Called in response to a player playing a card.
    * If the bid is valid returns the new state-helper,
    * otherwise an exception is thrown
    */
   makeBid(bid: Bid): Board {
      let err = validateBid(bid, this);
      if (err) throw err;
      return new Board(this.boardState.updateIn(["bids"], bids => bids.push(bid)));
   }

   /**
    * Called in response to a player making a bid.
    * If the card is valid returns the new state-helper,
    * otherwise an exception is thrown
    */
   playCard(card: Card): Board {
      let err = validateCard(card, this);
      if (err) throw err;
      let playedCard = {
      	"seat": this.nextPlayer, 
      	"card": card 
   	};
      return new Board(this.boardState.updateIn(["cards"], cards => cards.push(playedCard)));
   }
}