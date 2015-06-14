/* @flow */

import {Deck} from "../core/deck";
import {Seat} from "../core/seat";
import {Bid, BidType, BidSuit} from "../core/bid";
import {Card, Pip, Suit} from "../core/card";
import {GameScorer} from "./game-scorer";
import {validateBid, validateCard} from "./validators";
import {Board} from "./board-state";

/** 
 * Helper class for analysing game-state.
 * This class is designed to be immutable from the outside
 */
export class Game {

   constructor(gameState: IGameState) {
      this.gameState = gameState || { boards: [] };
      
      if (this.gameState.boards.length > 0)
         this._currentBoard = new Board(this.gameState.boards[this.gameState.boards.length -1])
   }

   /**
    * Returns the current board
    */
   get currentBoard(): Board {
      return this._currentBoard;
   }

   /**
    * Create an identical copy of our state
    */
   cloneState(): Game {
      let newstate = JSON.parse(JSON.stringify(this.gameState));
      return newstate;
      //return Object.assign(this.gameState);
   }

   /**
    * Starts a new board
    */
   newBoard(dealer: Seat): Game {
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

      let newstate = this.cloneState();
      newstate.boards.push(board);
      return new Game(newstate);
   }

   /**
    * Called in response to a player playing a card.
    * If the bid is valid returns the new state-helper,
    * otherwise an exception is thrown
    */
   makeBid(bid: Bid): Game {
      let err = validateBid(bid, this.currentBoard);
      if (err) throw err;

      let newgame = new Game(this.cloneState());
      newgame.currentBoard.bids.push(bid);
      return newgame;
   }

   /**
    * Called in response to a player making a bid.
    * If the card is valid returns the new state-helper,
    * otherwise an exception is thrown
    */
   playCard(card: Card): Game {
      let err = validateCard(card, this.currentBoard);
      if (err) throw err;

      let newgame = new Game(this.cloneState());
      newgame.currentBoard.cards.push({"seat": this.currentBoard.nextPlayer, "card": card });
      return newgame;
   }

}