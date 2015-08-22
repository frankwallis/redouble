/// <reference path="../../_references.d.ts" />

import {Component, View, NgFor, NgIf} from 'angular2/angular2';

import {CardComponent} from '../components/card';
import {Seat} from '../../model/core/seat';
import {GameService} from "../../services/game-service";

@Component({
   selector: 'trick-component',
   viewBindings: [GameService],
   bind: {
      card: "card"
   }
})
@View({
   templateUrl: 'src/ui/table/trick.html',
   directives: [CardComponent, NgFor, NgIf]
})
export class TrickComponent {
   constructor(gameService: GameService) {
      this.Seat = Seat;
      this.gameService = gameService;
   }
   
   private gameService: GameService;
   public Seat: typeof Seat;
}
