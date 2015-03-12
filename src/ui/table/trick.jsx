/* @flow */

import React from 'react';
import {CardComponent} from '../components/card.jsx';
import {Seat} from '../../model/core/seat';

export class TrickComponent extends React.Component {

   constructor(props) {
      super(props);
   }

   render() {
      var cards = Seat.all().map((seat) => {
         return <li key={seat} className={"trick-card-" + Seat.name(seat)}>
            <CardComponent card={this.props.game.currentTrick[seat]}/>
         </li>
      });

      return (
         <ol className="trick-container">
            {cards}
         </ol>
      );
   }
}
