import {Component, Decorator, Template, Foreach} from 'angular2/angular2';

import {BidComponent} from '../components/bid';
import {BidSuit, BidType, Bid} from '../../model/core/bid';
import {GameService} from '../../stores/game-store';

@Component({
  selector: 'bidding-box',
  services: [GameService]
})
@Template({
  url: 'src/ui/table/bidding-box.html',
  directives: [Foreach, BidComponent]
})
export class BiddingBox {
   constructor(gameService: GameService) {
      this.gameService = gameService;
      this.levels = [];

      for (let i = 1; i <= 7; i++) {
         let cells = [];
         for (var s = BidSuit.Clubs; s <= BidSuit.NoTrumps; s ++) {
            cells.push({type: BidType.Call, suit: s, level: i});
         }

         this.levels.push(cells);
      }

      this.Bid = Bid;
      this.BidType = BidType;
      this.BidSuit = BidSuit;
      console.log('created bidding-box')
   }

   makeBid(bid) {
      console.log('in makeBid + ' + JSON.stringify(bid));
      this.gameService.makeBid(bid);
   }
}
