/// <reference path="../../_references.d.ts" />

import {Component, View, Switch, SwitchWhen} from 'angular2/angular2.js';
import {BidType, BidSuit, Bid, IBid} from '../../model/core/bid';

@Component({
   selector: 'bid-component',
   services: [],
   bind: {
      bid: "bid"
   }
})
@View({
   url: 'src/ui/components/bid.html',
   directives: [Switch, SwitchWhen]
})

export class BidComponent {

   constructor() {
      this.Bid = Bid;
      this.BidSuit = BidSuit;
      this.BidType = BidType;
   }

   bid: IBid;
   Bid: typeof Bid;
   BidSuit: typeof BidSuit;
   BidType: typeof BidType;

   suitClass(suit): any {
      console.log('in suitClass ' + suit);
      //return ['bid-suit', 'suit-spades'];
      return 'bid-suit suit-spades';// + Bid.suitName(suit);
   }
}
