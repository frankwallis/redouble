/// <reference path="../../_references.d.ts" />

import {Rubber} from "../../model/gameplay-generators/rubber";
//import {Hand} from "../player/hand.jsx!";
import {BiddingBox} from "../player/bidding-box.jsx!";

import React from 'react';

export class Table extends React.Component {

    constructor(props) {
      super(props);
      // this.props = {
      //   game: new Rubber()
      // }
      this.rubber = new Rubber();
      this.game = this.rubber.newGame();
      // this.game = game;
      // console.log('playing table')
      // this.game.play()
      // 	.then((game) => {
			// 	     //$state.go(".result");
      // 		});
    }

    componentDidMount() {
      console.log('mounted ' + JSON.stringify(this.props));

      this.rubber.nextState(this.game)
        .then((game) => {
          this.game = game;
          this.render();
        });
//      for (var state of this.props.game.play())
  //      this.setState(state);

      // this.state.game.play()
      //   .then((game) => {
      //     this.setState({game: game})
      //   });
    }

    render() {
      console.log('rendering');

//      var hands = [];
      //this.state.game.players.map((player) => {
      //  return <Hand key={player.seat} hand={player.hand}></Hand>
      //});

      return (
        <BiddingBox game={this.game} className="table-bidding-box"></BiddingBox>
      );
      // return (
      //   <div className="table-hand">
      //     {hands}
      //   </div>
      // );
    }
}

React.render(<Table/>, document.body);
