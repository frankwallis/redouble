import {GameStateHelper} from "../model/game/game-state";
//import {NotificationActions} from "./notification-store";

export class GameService {
   constructor() {
      this.states = [ new GameStateHelper().newBoard() ];
      this.currentStateIdx = 0;
   }

   get currentState() {
      return this.states[this.currentStateIdx];
   }

   pushState(state) {
      this.states = this.states.slice(0, this.currentStateIdx);
      this.states.push(state);
      this.currentStateIdx = this.states.length -1;
   }

   newBoard() {
      this.pushState(this.currentState.newBoard());
   }

   makeBid(bid) {
      console.log('making bid');

      var err = this.currentState.validateBid(bid);

      if (err) {
         this.notificationService.error({
            title: "Invalid bid",
            message: err.message
         });
      } else {
         var newstate = this.currentState.makeBid(bid);
         this.pushState(newstate);
      }
   }

   playCard(card) {
      var err = this.currentState.validateCard(card);

      if (err) {
         this.notificationService.error({
            title: "Invalid bid",
            message: err.message
         });
      } else {
         var newstate = this.currentState.playCard(card);
         this.pushState(newstate);
      }
   }

   back() {
      if (this.currentStateIdx > 0)
         this.currentStateIdx --;
   }

   forward() {
      if (this.currentStateIdx < this.states.length -1)
         this.currentStateIdx ++;
   }

}
