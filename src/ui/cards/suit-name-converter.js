/// <reference path="../../_references.d.ts" />

import {ValueConverter} from 'aurelia-framework';

export class TowerSuitNameValueConverter {
  static metadata(){ return [new ValueConverter("towerSuitName")]; }

  toView(value: tower.BidSuit, option){
    switch(value) {
        case tower.BidSuit.Spades: return "spades";
        case tower.BidSuit.Hearts: return "hearts";
        case tower.BidSuit.Diamonds: return "diamonds";
        case tower.BidSuit.Clubs: return "clubs";
        case tower.BidSuit.NoTrumps: return "no-trumps";
        default: return "unknown";
    }
  }

  fromView(value, option){
    throw new Error("unimplemented");
  }
}
