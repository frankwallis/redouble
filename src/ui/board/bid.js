/// <reference path="../../_references.d.ts" />

import {Behavior} from 'aurelia-framework';

export class TowerBid {

    static metadata(){ return Behavior.withProperty('bid'); }

    constructor() {
      //console.log('creating bid')
    }

    get isNoBid() {
      return this.bid.type == tower.BidType.NoBid;
    }

    get isSuitBid() {
      return this.bid.type == tower.BidType.Call;
    }

    get isDouble() {
      return this.bid.type == tower.BidType.Double;
    }

    get isRedouble() {
      return this.bid.type == tower.BidType.Redouble;
    }
}
