/* @flow */

import Reflux from 'reflux';
import {GameStateHelper} from "../model/game/game-state";
import {validateBid, validateCard} from "../model/game/validators";
import {NotificationActions} from "./notification-store";
import {Seat} from "../model/core/seat";

export const GameActions = Reflux.createActions([
   "newGame",
   "newBoard",
   "makeBid",
   "playCard",
   "back",
   "forward"
]);

/**
 * Store for managing the current state of the game.
 * Maintains a cache of all previous game states which
 * can be used to undo plays
 */
export const GameStore = Reflux.createStore({
   init: function() {
      this.listenToMany(GameActions);
      this.reset();
   },
   reset: function() {
      this.states = [ new GameStateHelper().newBoard(Seat.North) ];
      this.currentStateIdx = 0;
   },
   getInitialState: function() {
      return this.states[this.currentStateIdx];
   },
   currentState: function() {
      return this.states[this.currentStateIdx];
   },
   pushState(state) {
      this.states = this.states.slice(0, this.currentStateIdx);
      this.states.push(state);
      this.currentStateIdx = this.states.length -1;
   },
   onNewBoard: function() {
      this.pushState(this.currentState().newBoard());
      this.trigger(this.currentState());
   },
   onMakeBid: function(bid) {
      console.log('making bid');
      let result = this.currentState().makeBid(bid);
      this.pushState(result);
      this.trigger(this.currentState());
   },
   onPlayCard: function(card) {
      let result = this.currentState().playCard(card);
      this.pushState(result);
      this.trigger(this.currentState());
   },
   onBack: function() {
      if (this.currentStateIdx > 0)
         this.currentStateIdx --;
      this.trigger(this.currentState());
   },
   onForward: function() {
      if (this.currentStateIdx < this.states.length -1)
         this.currentStateIdx ++;
      this.trigger(this.currentState());
   }
});

GameActions.makeBid.shouldEmit = function(bid) {
   let err = validateBid(bid, GameStore.currentState());

   if (err) {
      NotificationActions.error({
         title: "Invalid bid",
         message: err.message
      });
   }

   return !err;
}

GameActions.playCard.shouldEmit = function(card) {
   let err = validateCard(card, GameStore.currentState());

   if (err) {
      NotificationActions.error({
         title: "Invalid card",
         message: err.message
      });
   }

   return !err;
}
