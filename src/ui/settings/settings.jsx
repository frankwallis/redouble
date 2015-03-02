/* @flow */

import React from 'react';
import Reflux from 'reflux';

import {PlayerStore, PlayerActions} from "../../model/players/player-store";
import {Seat} from "../../model/core/seat";

export class SettingsView extends React.Component {

   constructor(props) {
      super(props);
      this.players = PlayerStore.players;
   }

   componentDidMount() {
      this.unsubscribePlayers = PlayerStore.listen((players) => {
         this.players = players;
         this.forceUpdate();
      });
   }

   componentWillUnmount() {
      this.unsubscribePlayers();
   }

   handleChangeName(seat, event) {
      PlayerActions.updatePlayer(seat, {name: event.target.value});
   }

   handleChangeHuman(seat, event) {
      PlayerActions.updatePlayer(seat, {ishuman: event.target.value});
   }

   render() {
      console.log('rendering setings');

      var players = Seat.all().map((seat) => {
         return <li className="settings-player" key={seat}>
            <h3 className="settings-player-header">{Seat.name(seat)}</h3>
            <label for={"name-input-" + Seat.name(seat)}>Name</label>
            <input type="text" id={"name-input-" + Seat.name(seat)}
                   className={"name-input-" + Seat.name(seat)}
                   defaultValue={this.players[seat].name}
                   onChange={(event) => this.handleChangeName(seat, event)}></input>
            <label for={"human-input-" + Seat.name(seat)}>Human?</label>
            <input type="checkbox" id={"human-input-" + Seat.name(seat)}
                   defaultChecked={this.players[seat].ishuman}
                   onChange={(event) => this.handleChangeHuman(seat, event)}></input>
         </li>
      });

      return (
         <div>
            <h1>Settings</h1>
            <ul>
               {players}
            </ul>
         </div>
      );
   }
}
