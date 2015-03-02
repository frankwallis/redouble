/* @flow */

import Reflux from 'reflux';
import {Seat} from "../core/seat";

export const PlayerActions = Reflux.createActions([
   "updatePlayer"
]);

export const PlayerStore = Reflux.createStore({
   init: function() {
      this.listenToMany(PlayerActions);

      this.players = Seat.all()
         .map((seat) => {
            return {
               seat: seat,
               name: Seat.name(seat),
               ishuman: (seat == Seat.South)
            };
         });
   },
   onUpdatePlayer: function(seat, delta) {
      console.log('updating player');
      Object.keys(delta).forEach((key) => {
         this.players[seat][key] = delta[key];
      })
      this.trigger(this.players);
   }
});
