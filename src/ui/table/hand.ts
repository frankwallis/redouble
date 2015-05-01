/// <reference path="../../_references.d.ts" />

import {Component, View, Foreach} from 'angular2/angular2.js';

import {CardComponent} from '../components/card';
import {GameService} from '../../services/game-service';
import {Card} from '../../model/core/card';

@Component({
   selector: 'hand-component',
   services: [GameService],
   bind: {
      seat: "seat"
   }
})
@View({
   url: 'src/ui/table/hand.html',
   directives: [Foreach, CardComponent]
})
export class HandComponent {

   constructor(gameService: GameService) {
      this.gameService = gameService;
   }

   private gameService: GameService;
   private seat: number;
   
   get availableCards() {
      console.log('getting available for ' + this.seat);
      return this.gameService.currentState.currentBoard.hands[this.seat]
         .filter((card) => !this.gameService.currentState.hasBeenPlayed(card))
         .sort((c1,c2) => Card.compare(c1, c2, this.gameService.currentState.trumpSuit));
   }

   playCard(card) {
      this.gameService.playCard(card);
   }
}
