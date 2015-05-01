/// <reference path="../../_references.d.ts" />

import {Component, View, Foreach, If} from 'angular2/angular2.js';

import {CardComponent} from '../components/card';
import {Seat} from '../../model/core/seat';
import {GameService} from "../../services/game-service";

@Component({
   selector: 'trick-component',
   services: [GameService],
   bind: {
      card: "card"
   }
})
@View({
   url: 'src/ui/table/trick.html',
   directives: [CardComponent, Foreach, If]
})
export class TrickComponent {
   constructor(gameService: GameService) {
      this.Seat = Seat;
      this.gameService = gameService;
   }
   
   private gameService: GameService;
   public Seat: typeof Seat;
}
