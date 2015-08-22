/// <reference path="../../_references.d.ts" />

import {Component, View, NgSwitch, NgSwitchWhen} from 'angular2/angular2';
import {BidType, BidSuit, Bid, IBid} from '../../model/core/bid';

import "./suit.css";
import "./bid.css";

@Component({
   selector: 'bid-component',
   properties: [ "bid" ]
})
@View({
   templateUrl: 'src/ui/components/bid.html',
   directives: [NgSwitch, NgSwitchWhen]
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
