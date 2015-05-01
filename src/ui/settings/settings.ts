/// <reference path="../../_references.d.ts" />

import {Component, View, Foreach} from 'angular2/angular2.js';

import {PlayerService} from "../../services/player-service";
import {Seat} from "../../model/core/seat";

//console.log(JSON.stringify(Component({
//  selector: 'settings-view',
//  services: [PlayerService]
//})));

@Component({
  selector: 'settings-view',
  services: [PlayerService]
})
@View({
  url: 'src/ui/settings/settings.html',
  directives: [Foreach]
})
export class SettingsView {
   constructor(playerService: PlayerService) {
      this.playerService = playerService;
      this.players = playerService.players;
      this.Seat = Seat;
   }

   public playerService: PlayerService;
   public players: Array<any>;
   public Seat: any;

   handleChangeName(seat, event) {
      this.playerService.updatePlayer(seat, {name: event.target.value});
   }

   handleChangeHuman(seat, event) {
      this.playerService.updatePlayer(seat, {ishuman: event.target.value});
   }
}
