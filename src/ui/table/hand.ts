/// <reference path="../../_references.d.ts" />

import {Component, View, For} from 'angular2/angular2';

import {CardComponent} from '../components/card';
import {GameService} from '../../services/game-service';
import {Card} from '../../model/core/card';

@Component({
   selector: 'hand-component',
   injectables: [GameService],
   properties: {
      seat: "seat"
   }
})
@View({
   templateUrl: 'src/ui/table/hand.html',
   directives: [For, CardComponent]
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
