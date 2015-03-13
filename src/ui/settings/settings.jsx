/* @flow */

import React from 'react';
import Reflux from 'reflux';

import {PlayerStore, PlayerActions} from "../../stores/player-store";
import {Seat} from "../../model/core/seat";

/**
 * Top-Level view for the game settings
 */
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
            <div className="settings-field">
               <label className="settings-label"
                      htmlFor={"name-input-" + Seat.name(seat)}>Name</label>
               <input className="settings-input-name"
                      type="text" id={"name-input-" + Seat.name(seat)}
                      defaultValue={this.players[seat].name}
                      onChange={(event) => this.handleChangeName(seat, event)}></input>
            </div>
            <div className="settings-field">
               <label className="settings-label"
                      htmlFor={"human-input-" + Seat.name(seat)}>Human?</label>
               <input className="settings-input-human"
                      type="checkbox" id={"human-input-" + Seat.name(seat)}
                      defaultChecked={this.players[seat].ishuman}
                      onChange={(event) => this.handleChangeHuman(seat, event)}></input>
            </div>
         </li>
      });

      return (
         <div>
            <h1>Settings</h1>
            <ul className="settings-players">
               {players}
            </ul>
         </div>
      );
   }
}
