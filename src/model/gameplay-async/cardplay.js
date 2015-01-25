/// <reference path="../../_references.d.ts" />

import {nextPlayer} from "./utils"

//implements tower.IGameSequence
export class Cardplay {

    static get $inject() { return [ "$q", "$timeout", "$log" ] };
    
    constructor($q: ng.IQService, 
                $timeout: ng.ITimeoutService,
                $log: ng.ILogService) {   
        this.$q = $q;
    }

    players: Array<tower.IPlayer>;

    play(players: Array<tower.IPlayer>, firstPlayer: tower.IPlayer) {
      // wrap in angular promise
      return this.$q.when({});
	}
}
