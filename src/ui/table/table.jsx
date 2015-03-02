/* @flow */

import React from 'react';
import Reflux from 'reflux';

import {PlayerStore} from "../../model/players/player-store";
import {GameStore, GameActions} from "../../model/game/game-store";
import {GameState} from "../../model/game/game-state";
import {Seat, seatName} from "../../model/core/seat";

import {HandComponent} from "./hand.jsx";
import {BiddingBox} from "./bidding-box.jsx";
import {BiddingHistory} from "./bidding-history.jsx";
import {TrickComponent} from "./trick.jsx";

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
      console.log('rendering');

      var players = this.players.map((player) => {
         return (
            <div className={"table-edge-" + Seat.name(player.seat)} key={player.seat}>
               <header className="table-player-name">{player.name}</header>
               <HandComponent className={"table-hand-" + Seat.name(player.seat)}
                              seat={player.seat}
                              game={this.game}/>
            </div>
         );
      });

      var board = this.game.biddingHasEnded ?
         board = <TrickComponent game={this.game}/>
         : board = <BiddingHistory board={this.game.currentBoard}/>;

      var biddingBox = <BiddingBox className="table-bidding-box" game={this.game}/>

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
