/* @flow */

import React from 'react';
import {CardComponent} from '../components/card.jsx';
import {GameActions} from '../../stores/game-store';
import {Card} from '../../model/core/card';

export class HandComponent extends React.Component {

   constructor(props) {
      super(props);
   }

   get availableCards() {
      return this.props.game.currentBoard.hands[this.props.seat]
         .filter((card) => !this.props.game.hasBeenPlayed(card))
         .sort((c1,c2) => Card.compare(c1,c2, this.props.game.currentBoard.trumpSuit));
   }

   playCard(card) {
      GameActions.playCard(card);
   }

   render() {
      console.log('rendering hand');

      var cards = this.availableCards.map((card) => {
         return (
            <li className="hand-card" key={CardComponent.key(card)}>
               <button className="hand-card-button"
                       onClick={() => this.playCard(card)}>
                  <CardComponent card={card}/>
               </button>
            </li>
         );
      });

      return (<div className="hand-container"><ol className="container">{cards}</ol></div>);
   }
}
