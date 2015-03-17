import {
   Component, Template,
   Foreach, Switch, SwitchWhen} from 'angular2/angular2';

import {PlayerService} from "../../services/player-service";
import {GameService} from "../../services/game-service";
import {GameState} from "../../model/game/game-state";
import {Seat, seatName} from "../../model/core/seat";

import {HandComponent} from "./hand";
import {BiddingBox} from "./bidding-box";
import {BiddingHistory} from "./bidding-history";
import {TrickComponent} from "./trick";

/**
 * Top-Level View for displaying the current game from the GameStore
 */
@Component({
   selector: 'table-view',
   services: [GameService, PlayerService]
})
@Template({
   url: 'src/ui/table/table.html',
   directives: [
      Foreach, Switch, SwitchWhen,
      BiddingBox, HandComponent, BiddingHistory, TrickComponent,
   ]
})

export class TableView {
   constructor(gameService: GameService, playerService: PlayerService) {
      this.seats = Seat.all();
      this.players = playerService.players;
      this.gameService = gameService;
      this.Seat = Seat;
   }
}
