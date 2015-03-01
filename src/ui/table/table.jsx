/// <reference path="../../_references.d.ts" />

import React from 'react';
import Reflux from 'reflux';

import {GameStore, GameActions} from "../../model/game/game-store";
import {GameState} from "../../model/game/game-state";

import {HandComponent} from "../player/hand.jsx";
import {BiddingBox} from "../player/bidding-box.jsx";
import {BiddingTable} from "../board/bidding-table.jsx";

import {Human} from "../../model/players/human";
import {Computer} from "../../model/players/computer";

export class Table extends React.Component {

   constructor(props) {
      super(props);

      // TODO - make a player store
      this.players = [ new Computer("player1"), new Computer("player2"), new Human("player3"), new Computer("player4") ];
      this.players.forEach((player, idx) => {
         player.game = this;
         player.seat = idx;
      });

      this.game = GameStore.currentState();
      // Registers a console logging callback to the statusStore updates
      GameStore.listen((state) => {
         this.game = state;
         this.forceUpdate();
         console.log('state: ', state);
      });

      console.log(JSON.stringify(GameStore.currentState()));
   }

   componentDidMount() {
      console.log('mounted ' + JSON.stringify(this.props));
   }

   static seatName(seat) {
      switch(seat) {
      case tower.Seat.North:
         return "north";
      case tower.Seat.South:
         return "south";
      case tower.Seat.East:
         return "east";
      case tower.Seat.West:
         return "west";
      default:
         throw new Error("unrecognised seat");
      }
   }

   render() {
      console.log('rendering');

      var players = this.players.map((player) => {
         return (
            <div className={"table-edge-" + Table.seatName(player.seat)} key={player.seat}>
               <header className="table-player-name">{player.name}</header>
               <HandComponent className={"table-hand-" + Table.seatName(player.seat)}
                              seat={player.seat}
                              game={this.game}/>
            </div>
         );
      });

      var board

      if (this.game.biddingHasEnded)
         board = <ol/>;
      else
         board = <BiddingTable board={this.game.currentBoard}/>

      var biddingBox = (
         <BiddingBox className="table-bidding-box"
                     game={this.game}/>
      );

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

React.render(<Table/>, document.body);
