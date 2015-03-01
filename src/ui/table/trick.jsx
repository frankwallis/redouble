/// <reference path="../../_references.d.ts" />

import React from 'react';
import {CardComponent} from '../components/card.jsx';

export class TrickComponent extends React.Component {

   constructor(props) {
      super(props);
   }

   render() {
      return (
         <ol className="trick-container">
            <li className="table-edge-north">
               <CardComponent pip={this.props.trick.northCard.pip} suit={this.props.trick.northCard.suit}/>
            </li>

            <li class="table-edge-west">
               <CardComponent pip={this.props.trick.westCard.pip} suit={this.props.trick.westCard.suit}/>
            </li>

            <li class="table-edge-east">
               <CardComponent pip={this.props.trick.eastCard.pip} suit={this.props.trick.eastCard.suit}/>
            </li>

            <li class="table-edge-south">
               <CardComponent pip={this.props.trick.southCard.pip} suit={this.props.trick.southCard.suit}/>
            </li>
         </ol>
      );
   }
}
