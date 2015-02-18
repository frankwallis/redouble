/// <reference path="../../_references.d.ts" />

import {Behavior} from 'aurelia-framework';

export class TowerBidding {

    static metadata(){ return Behavior.withProperty('bidding'); }

    constructor() {
      //this.rounds = getRounds()
    }

    //rounds: Array<Array<tower.IBid>>;

    get rounds(bidding: tower.IBidding) {
      console.log('in rounds');
        var result = [];

        for (var i = 0; i < 6; i ++) {
            result.push([]);
            for (var j = 0; j < 4; j ++) {
                result[i].push({});
            }
        }

        this.bidding.bids.forEach(function(bid, idx) {
            result[Math.floor(idx/4)][idx % 4] = bid;
        });
        console.log('leaving rounds');
        return result;
    }
}
