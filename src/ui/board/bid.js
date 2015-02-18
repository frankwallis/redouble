/// <reference path="../../_references.d.ts" />

import {Behavior} from 'aurelia-framework';

export class TowerBid {

    static metadata(){ return Behavior.withProperty('bid'); }

    constructor() {
      console.log('creating bid')
    }

    get isNoBid() {
      console.log('in no bid')
      return this.bid.type == 0;//tower.BidType.NoBid;
    }

    get isSuitBid() {
      console.log('in suit bid')
      return this.bid.type == 1;//tower.BidType.Call;
    }

    get isDouble() {
      console.log('in double')
      return this.bid.type == 2;//tower.BidType.Double;
    }

    get isRedouble() {
      console.log('in redouble')
      return this.bid.type == 3;//tower.BidType.Redouble;
    }
}
