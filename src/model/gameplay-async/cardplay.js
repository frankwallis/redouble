/// <reference path="../../_references.d.ts" />

import {Trick} from "./trick";

//implements tower.IGameSequence
export class Cardplay {

    constructor() {
      this.tricks = [];
    }

    tricks: Array<tower.ITrick>;
    //currentTrickIndex: number = -1;
    get currentTrick(): tower.ITrick {
      return this.tricks[this.tricks.length -1];
    }

    async play(players: Array<tower.IPlayer>, leader: tower.Seat) {
      console.log('playing cardplay');
      var current = leader;

      for (var i = 0; i < 13; i ++) {
        var trick = new Trick();
        this.tricks[i] = trick;
        await trick.play(players, current);
        current = trick.winner;
      }
    }
}
