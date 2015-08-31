/// <reference path="../../_references.d.ts" />

import {Component, View, NgFor} from 'angular2/angular2';

import {PlayerService} from "../../services/player-service";
import {Seat} from "../../model/core/seat";

import "./settings.css";
import settingsTemplate from "./settings.html";

@Component({
  selector: 'settings-view',
  viewBindings: [PlayerService]
})
@View({
  template: settingsTemplate,
  directives: [NgFor]
})
export class SettingsView {
   constructor(playerService: PlayerService) {
      this.playerService = playerService;
      this.players = this.playerService.players;
      this.Seat = Seat;
      this.seats = Seat.all();
   }

   public playerService: PlayerService;
   public players: Array<any>;
   public Seat: any;
   public seats: Array<number>;

   handleChangeName(seat, event) {
      this.playerService.updatePlayer(seat, {name: event.target.value});
   }

   handleChangeHuman(seat, event) {
      this.playerService.updatePlayer(seat, {ishuman: event.target.value});
   }
}
