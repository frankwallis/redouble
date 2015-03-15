import {Component, Decorator, Template, NgElement, Foreach} from 'angular2/angular2';

import {PlayerStore, PlayerActions} from "../../stores/player-store";
import {Seat} from "../../model/core/seat";

@Component({
  selector: 'settings-view',
  services: []//[GreetingService]
})
@Template({
  url: 'src/ui/settings/settings.html',
  directives: [Foreach]//[RedDec]
})

export class SettingsView {
   constructor() {
      super();
      this.players = PlayerStore.players;
      this.Seat = Seat;
      this.seats = Seat.all();
   }

   handleChangeName(seat, event) {
      PlayerActions.updatePlayer(seat, {name: event.target.value});
   }

   handleChangeHuman(seat, event) {
      PlayerActions.updatePlayer(seat, {ishuman: event.target.value});
   }
}
