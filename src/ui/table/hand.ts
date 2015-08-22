/// <reference path="../../_references.d.ts" />

import {Component, Directive, View, NgFor} from 'angular2/angular2';

import {CardComponent} from '../components/card';
import {GameService} from '../../services/game-service';
import {Card} from '../../model/core/card';

import handTemplate from "./hand.html";
import "./hand.css";

@Component({
   selector: 'hand-component',
   properties: [ "seat" ]
})
@View({
   template: handTemplate,
   directives: [NgFor, CardComponent]
})
export class HandComponent {

   constructor(gameService: GameService) {
      this.gameService = gameService;
      console.log('creating hand');
   }

   private gameService: GameService;
   public seat: number;
   
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
