/* @flow */

import React from 'react';
import Reflux from 'reflux';

import {PlayerStore} from "../../stores/player-store";
import {GameStore, GameActions} from "../../stores/game-store";
import {GameState} from "../../model/game/game-state";
import {Seat} from "../../model/core/seat";

import {HandComponent} from "./hand.jsx";
import {BiddingBox} from "./bidding-box.jsx";
import {BiddingHistory} from "./bidding-history.jsx";
import {TrickComponent} from "./trick.jsx";

/**
 * Top-Level View for displaying the current game from the GameStore
 */
export class Table extends React.Component {

   constructor(props) {
      super(props);

      this.players = PlayerStore.players;
      this.game = GameStore.currentState();
   }

   componentDidMount() {
      this.unsubscribePlayers = PlayerStore.listen((players) => {
         this.players = players;
         this.forceUpdate();
      });

      this.unsubscribeGame = GameStore.listen((state) => {
         this.game = state;
         this.forceUpdate();
      });
   }

   componentWillUnmount() {
      this.unsubscribePlayers();
      this.unsubscribeGame();
   }

   render() {
      console.log('rendering table');

      var players = Seat.all().map((seat) => {
         return (
            <section className={"table-edge-" + Seat.name(seat)} key={seat}>
               <header className="table-player-name">{this.players[seat].name}</header>
               <div className={"table-hand-" + Seat.name(seat)}>
                  <HandComponent seat={seat}
                                 game={this.game}/>
               </div>
            </section>
         );
      });

      var board = this.game.biddingHasEnded ?
         <TrickComponent game={this.game}/> :
         <BiddingHistory board={this.game.currentBoard}/>;

      var biddingBox = this.game.biddingHasEnded ? 
         undefined : 
         <BiddingBox className="table-bidding-box" game={this.game}/>;

      return (
         <div className="bridge-table">
            <div className="table-players">
               {players}
            </div>
            <div className="table-board">
               {board}
            </div>
            <div className="table-bidding-box">
               {biddingBox}
            </div>
         </div>
      );
   }
}
