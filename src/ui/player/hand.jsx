/// <reference path="../../_references.d.ts" />

import React from 'react';
import {Card} from '../cards/card.jsx!';

export class Hand extends React.Component {

   constructor(props) {
      super(props);
   }

   get availableCards() {
      return this.props.game.currentBoard.hands[this.props.seat]
      .filter((card) => !this.props.game.hasBeenPlayed(card));
   }

   playCard(card) {
      var state = this.props.game.playCard(card);
      this.props.onGameStateChanged(state);
   }

   render() {
      var cards = this.availableCards.map((card) => {
         return (
            <li className="hand-card" key={Card.key(card)}>
               <button className="hand-card-button"
                     onClick={() => this.playCard(card)}>
                  <Card pip={card.pip} suit={card.suit}></Card>
               </button>
            </li>
         );
      });

      return (<ol className="hand-container">{cards}</ol>);
   }
}
