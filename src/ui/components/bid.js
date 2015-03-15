import {Component, Template, Switch, SwitchWhen} from 'angular2/angular2';
import {BidType, BidSuit, Bid} from '../../model/core/bid';

@Component({
   selector: 'bid-component',
   services: [],
   bind: {
      bid: "bid"
   }
})
@Template({
   url: 'src/ui/components/bid.html',
   directives: [Switch, SwitchWhen]
})

export class BidComponent {

   bid: any;
   
   constructor() {
      this.Bid = Bid;
      this.BidSuit = BidSuit;
      this.BidType = BidType;
   }

   suitClass(suit): any {
      console.log('in suitClass ' + suit);
      //return ['bid-suit', 'suit-spades'];
      return 'bid-suit suit-spades';// + Bid.suitName(suit);
   }
}
