/// <reference path="../../_references.d.ts" />

import {Rubber} from "../../model/gameplay-generators/rubber";
import {Hand} from "../player/hand.jsx!";
import {BiddingBox} from "../player/bidding-box.jsx!";

import React from 'react';

export class Table extends React.Component {

    constructor(props) {
      super(props);
      this.rubber = new Rubber();
      this.game = this.rubber.newGame();
    }

    async componentDidMount() {
      console.log('mounted ' + JSON.stringify(this.props));

      while(true) {
        this.game = await this.rubber.nextState(this.game)
        console.log(JSON.stringify(this.game));
      }
    }

    render() {
      console.log('rendering');

      var hands = this.rubber.players.map((player) => {
        return <Hand key={player.seat}
                     seat={player.seat}
                     game={this.game}></Hand>
      });

      return (
        <div>
          <BiddingBox game={this.game} className="table-bidding-box"></BiddingBox>
          <div className="table-hand">
            {hands}
          </div>
        </div>
      );
    }
}

React.render(<Table/>, document.body);
