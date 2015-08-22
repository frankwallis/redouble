/// <reference path="../../_references.d.ts" />

import {Component, View, NgFor} from 'angular2/angular2';

import {BidComponent} from '../components/bid';
import {BidSuit, BidType, Bid} from '../../model/core/bid';
import {GameService} from '../../services/game-service';
import {Seat, seatName} from "../../model/core/seat";

import "./bidding-history.css";

@Component({
  selector: 'bidding-history'
})
@View({
  templateUrl: 'src/ui/table/bidding-history.html',
  directives: [NgFor, BidComponent]
})
export class BiddingHistory {

   constructor(gameService: GameService) {
      this.gameService = gameService;
      this.seats = Seat.all();
      this.seatName = seatName;
      this.rounds = [0,1,2,3,4,5]; // !!
      this.empty = { type: -1 };
   }

   private gameService: GameService;
   private seats: Array<number>;
   public seatName: any;
   public rounds: Array<any>;
   private empty: any;
   
   getBid(round, seat) {
      var position = (round * 4) + seat;

      if (position < this.gameService.currentState.currentBoard.bids.length)
         console.log('got ' + JSON.stringify(this.gameService.currentState.currentBoard.bids[position]));
      else
         console.log('got empty');

      if (position < this.gameService.currentState.currentBoard.bids.length)
         return this.gameService.currentState.currentBoard.bids[position];
      else
         return this.empty;
   }
   // rounds() {
   //    var rounds = [];
   //
   //    for (let i = 0; i < 6; i ++) {
   //       let cells = [];
   //
   //       for (let j = 0; j < 4; j ++) {
   //          let position = (i*4) + j;
   //          cells[j] = this.gameService.currentState.currentBoard.bids[position];
   //          cells[j] = cells[j] || { type: -1 };
   //       }
   //       rounds.push(cells);
   //    }
   //
   //    return rounds;
   // }
}
