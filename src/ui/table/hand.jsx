/// <reference path="../../_references.d.ts" />

import React from 'react';
import {CardComponent} from '../components/card.jsx';
import {GameActions} from '../../model/game/game-store';

export class HandComponent extends React.Component {

   constructor(props) {
      super(props);
   }

   get availableCards() {
      return this.props.game.currentBoard.hands[this.props.seat]
         .filter((card) => !this.props.game.hasBeenPlayed(card));
   }

   playCard(card) {
      //var state = this.props.game.playCard(card);
      //this.props.onGameStateChanged(state);
      GameActions.playCard(card);
   }

   render() {
      console.log('rendering hand');

      var cards = this.availableCards.map((card) => {
         return (
            <li className="hand-card" key={CardComponent.key(card)}>
               <button className="hand-card-button"
                     onClick={() => this.playCard(card)}>
                  <CardComponent pip={card.pip} suit={card.suit}/>
               </button>
            </li>
         );
      });

      return (<ol className="hand-container">{cards}</ol>);
   }
}
