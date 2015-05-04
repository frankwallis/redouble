/// <reference path="../../_references.d.ts" />

import {Component, View, For} from 'angular2/angular2';

import {BidComponent} from '../components/bid';
import {BidSuit, BidType, Bid, IBid} from '../../model/core/bid';
import {GameService} from '../../services/game-service';

@Component({
  selector: 'bidding-box',
  injectables: [GameService]
})
@View({
  templateUrl: 'src/ui/table/bidding-box.html',
  directives: [For, BidComponent]
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

   private gameService: GameService;
   public levels: Array<Array<IBid>>;
   
   public Bid: typeof Bid;
   public BidType: typeof BidType;
   public BidSuit: typeof BidSuit;
   
   makeBid(bid) {
      console.log('in makeBid + ' + JSON.stringify(bid));
      this.gameService.makeBid(bid);
   }
}
