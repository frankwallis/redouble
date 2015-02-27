/// <reference path="../../_references.d.ts" />

import {Rubber} from "../../model/gameplay-generators/rubber";
import {Hand} from "../player/hand.jsx!";
import {BiddingBox} from "../player/bidding-box.jsx!";
import {Bidding} from "../board/bidding.jsx!";
import React from 'react';

export class Table extends React.Component {

    constructor(props) {
      super(props);
      this.rubber = new Rubber();
      this.game = this.rubber.newGame();
    }

    async componentDidMount() {
      console.log('mounted ' + JSON.stringify(this.props));
      this.game = await this.rubber.nextState(this.game);

      // while(true) {
      //   this.game = await this.rubber.nextState(this.game);
      //   console.log(JSON.stringify(this.game));
      // }
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
        return <div className={"table-edge-" + Table.seatName(player.seat)} key={player.seat}>
                  <header className="table-player-name">
                    {player.name}
                  </header>
                  <Hand className={"table-hand-" + Table.seatName(player.seat)}
                        seat={player.seat}
                        game={this.game}
                        onGameStateChanged={(state) => this.gameStateChanged(state)}>
                  </Hand>
                  <BiddingBox className="table-bidding-box"
                              game={this.game}
                              onGameStateChanged={(state) => this.gameStateChanged(state)}>
                  </BiddingBox>
               </div>
      });

      var board

      if (this.game.biddingHasEnded)
        board = <ol></ol>;
      else
        board = <Bidding board={this.game.currentBoard}></Bidding>

      return (
        <div className="bridge-table">
          <div className="table-players">
            {players}
          </div>
          <div className="table-board">
            {board}
          </div>
        </div>
      );
    }
}

React.render(<Table/>, document.body);
