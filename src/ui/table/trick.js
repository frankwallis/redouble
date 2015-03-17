import {Component, Template, Foreach, If} from 'angular2/angular2';

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
@Template({
   url: 'src/ui/table/trick.html',
   directives: [CardComponent, Foreach, If]
})
export class TrickComponent {
   constructor(gameService: GameService) {
      this.Seat = Seat;
      this.gameService = gameService;
   }
}
