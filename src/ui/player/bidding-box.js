/// <reference path="../../_references.d.ts" />

import {Behavior} from 'aurelia-framework';

export class TowerBiddingBox {

    static metadata(){ return Behavior.withProperty('player').withProperty('bidding'); }

    constructor() {

        console.log('creating bidding-box')
        this.levels = [];

        for (var i = 1; i <= 7; i++) {
            this.levels[i] = [];

            for (var s = tower.BidSuit.Clubs; s <= tower.BidSuit.NoTrumps; s ++) {
                this.levels[i].push({ type: tower.BidType.Call, suit: s, level: i });
            }
        }

        this.double = { type: tower.BidType.Double };
        this.redouble = { type: tower.BidType.Redouble };
        this.nobid = { type: tower.BidType.NoBid };
        console.log('created bidding-box')
    }

    player: any;//tower.IPlayer;
    bidding: tower.IBidding;

    levels: any;//Array<Array<tower.IBid>>;
    double: tower.IBid;
    redouble: tower.IBid;
    nobid: tower.IBid;

    canBid(bid: tower.IBid): boolean {
        return true;
    }

    makeBid(bid: tower.IBid) {
        this.player.makeBid(bid);
    }
}
