/// <reference path="../../_references.d.ts" />

import {Rubber} from "../../model/gameplay-async/rubber";
import {Hand} from "../player/hand.jsx!";
import React from 'react';

export class Table extends React.Component {

    constructor(props) {
      super(props);
      this.state = {
        game: new Rubber()
      }
      // this.game = game;
      // console.log('playing table')
      // this.game.play()
      // 	.then((game) => {
			// 	     //$state.go(".result");
      // 		});
    }

    componentDidMount() {
      console.log('mounted');

      this.state.game.play()
        .then((game) => {
          this.setState({game: game})
        });
        // $.ajax({
        //   url: this.props.url,
        //   dataType: 'json',
        //   success: function(data) {
        //     this.setState({data: data});
        //   }.bind(this),
        //   error: function(xhr, status, err) {
        //     console.error(this.props.url, status, err.toString());
        //   }.bind(this)
        // });
    }

    render() {
      console.log('rendering');

      var hands = this.state.game.players.map((player) => {
        return <Hand key={player.seat} hand={player.hand}></Hand>
      });

      return (
        <div className="table-hand">
          {hands}
        </div>
      );
    }
}

React.render(<Table/>, document.body);
