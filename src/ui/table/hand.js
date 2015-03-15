import {Component, Template, Foreach} from 'angular2/angular2';

import {CardComponent} from '../components/card';
import {GameService} from '../../stores/game-store';
import {Card} from '../../model/core/card';

@Component({
   selector: 'hand-component',
   services: [GameService],
   bind: {
      seat: "seat"
   }
})
@Template({
   url: 'src/ui/table/hand.html',
   directives: [Foreach, CardComponent]
})
export class HandComponent {

   constructor(gameService: GameService) {
      this.gameService = gameService;
   }

   get availableCards() {
      console.log('getting available for ' + this.seat);
      return this.gameService.currentState.currentBoard.hands[this.seat]
         .filter((card) => !this.gameService.currentState.hasBeenPlayed(card))
         .sort((c1,c2) => Card.compare(c1,c2, this.gameService.currentState.currentBoard.trumpSuit));
   }

   playCard(card) {
      this.gameService.playCard(card);
   }
}
