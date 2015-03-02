/* @flow */

import React from 'react';
import {Suit,Pip,Card,suitName,pipName} from "../../model/core/card";

export class CardComponent extends React.Component {

    constructor(props) {
      super(props);
    }

    static key(card) {
      return suitName(card.suit) + pipName(card.pip);
    }

    render() {
      if (!this.props.card)
         return <div className="card-container"/>;

      return (
        <div className="card-container">
            <div className="card-edge-left">
                <div className="card-pip-small">{pipName(this.props.card.pip)}</div>
                <div className={"card-suit suit-" + suitName(this.props.card.suit)}></div>
            </div>

            <div className="card-pip">{pipName(this.props.card.pip)}</div>

            <div className="card-edge-right">
                <div className="card-pip-small">{pipName(this.props.card.pip)}</div>
                <div className={"card-suit suit-" + suitName(this.props.card.suit)}></div>
            </div>
        </div>
      );
    }
}
