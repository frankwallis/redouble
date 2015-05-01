/// <reference path="../_references.d.ts" />

import {Seat} from "../model/core/seat";

export interface IPlayer {
   seat: number;
   name: string;
   ishuman: boolean;
}

export class PlayerService {
   constructor() {
      this.players = Seat.all()
         .map((seat) => {
            return {
               seat: seat,
               name: Seat.name(seat),
               ishuman: (seat == Seat.South)
            };
         });
   }

   public players: Array<IPlayer>;
   
   updatePlayer(seat, delta) {
      console.log('updating player');
      Object.keys(delta).forEach((key) => {
         this.players[seat][key] = delta[key];
      })
   }
}
