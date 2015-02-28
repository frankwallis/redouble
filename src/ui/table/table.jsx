/// <reference path="../../_references.d.ts" />

import {Rubber} from "../../model/gameplay/rubber";
import {HandComponent} from "../player/hand.jsx";
import {BiddingBox} from "../player/bidding-box.jsx";
import {BiddingTable} from "../board/bidding-table.jsx";
import React from 'react';

export class Table extends React.Component {

   constructor(props) {
      super(props);
      this.rubber = new Rubber();
      this.game = this.rubber.newGame();
   }

   // async componentDidMount() {
   //    console.log('mounted ' + JSON.stringify(this.props));
   //    this.game = await this.rubber.nextState(this.game);
   //
   //    // while(true) {
   //    //   this.game = await this.rubber.nextState(this.game);
   //    //   console.log(JSON.stringify(this.game));
   //    // }
   // }

   componentDidMount() {
      console.log('mounted ' + JSON.stringify(this.props));
      this.rubber.nextState(this.game)
         .then((game) => {
            this.setState(game);
            this.render();
         });
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

   gameStateChanged(state) {
      console.log('in stateChanged')
      this.game = state;
      this.setState(state);
      this.render();
   }

   render() {
      console.log('rendering');

      var players = this.rubber.players.map((player) => {
         return (
            <div className={"table-edge-" + Table.seatName(player.seat)} key={player.seat}>
               <header className="table-player-name">{player.name}</header>
               <HandComponent className={"table-hand-" + Table.seatName(player.seat)}
                              seat={player.seat}
                              game={this.game}
                              onGameStateChanged={(state) => this.gameStateChanged(state)}/>
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
                     game={this.game}
                     onGameStateChanged={(state) => this.gameStateChanged(state)}/>
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
