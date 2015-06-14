/* @flow */

import React from 'react';
import {CardComponent} from '../components/card.jsx';
import {Seat} from '../../model/core/seat';

export class TrickComponent extends React.Component {

   constructor(props) {
      super(props);
   }

   getCard(seat: Seat): Card {
      let card = undefined;

      this.props.board.currentTrick.forEach((played) => {
         if (played.seat == seat)
            card = played.card;
      });

      return card;
   }

   render() {
      let cards = Seat.all().map((seat) => {
         return <li key={seat} className={"trick-card-" + Seat.name(seat)}>
            <CardComponent card={this.getCard(seat)}/>
         </li>
      });

      return (
         <ol className="trick-container">
            {cards}
         </ol>
      );
   }
}
