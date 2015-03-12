/* @flow */

import Reflux from 'reflux';
import {GameStateHelper} from "../model/game/game-state";
import {NotificationActions} from "./notification-store";

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
      this.states = [ new GameStateHelper().newBoard() ];
      this.currentStateIdx = 0;
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
      var result = this.currentState().makeBid(bid);
      this.pushState(result);
      this.trigger(this.currentState());
   },
   onPlayCard: function(card) {
      var result = this.currentState().playCard(card);
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
   var err = GameStore.currentState().validateBid(bid);

   if (err) {
      NotificationActions.error({
         title: "Invalid bid",
         message: err.message
      });
   }

   return !err;
}

GameActions.playCard.shouldEmit = function(card) {
   var err = GameStore.currentState().validateCard(card);

   if (err) {
      NotificationActions.error({
         title: "Invalid card",
         message: err.message
      });
   }

   return !err;
}
