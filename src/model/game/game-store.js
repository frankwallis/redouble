import Reflux from 'reflux';
import {Deck} from "../core/deck";
import {GameStateHelper} from "./game-state";

export const GameActions = Reflux.createActions([
   "newGame",
   "newBoard",
   "makeBid",
   "playCard",
   "back",
   "forward"
]);

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
      this.currentState().validateBid(bid);
      var result = this.currentState().clone();
      result.currentBoard.bids.push(bid);
      this.pushState(result);
      this.trigger(this.currentState());
   },
   onPlayCard: function(card) {
      this.currentState().validateCard(card);
      var result = this.currentState().clone();
      result.currentBoard.cards.push(card);
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
