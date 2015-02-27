/// <reference path="../../_references.d.ts" />

import React from 'react';
import {Card} from '../cards/card.jsx!';

export class Hand extends React.Component {

    constructor(props) {
      super(props);
      console.log('props: ' + JSON.stringify(props));
    }

    get availableCards() {
      return this.props.game.currentBoard.hands[this.props.seat]
        .filter((card) => !this.props.game.hasBeenPlayed(card));
    }

    render() {
      console.log(JSON.stringify(this.availableCards))
      var cards = this.availableCards.map((card) => {
        return <li key={Card.key(card)}>
                <button>
                  <Card pip={card.pip} suit={card.suit}></Card>
                </button>
               </li>;
      });

      return (<ol>{cards}</ol>);
    }
}
