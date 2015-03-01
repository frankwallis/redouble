/// <reference path="../../_references.d.ts" />

import React from 'react';

import {Suit,Pip,Card} from "../../model/core/card";

export class CardComponent extends React.Component {

    constructor(props) {
      super(props);
    }

    static suitName(suit) {
      switch(suit) {
          case Suit.Spades: return "spades";
          case Suit.Hearts: return "hearts";
          case Suit.Diamonds: return "diamonds";
          case Suit.Clubs: return "clubs";
          case Suit.NoTrumps: return "no-trumps";
          default: return "unknown";
      }
    }

    get suit() {
      return CardComponent.suitName(this.props.suit);
    }

    static pipName(pip) {
      switch(pip) {
          case Pip.Ace: return "A";
          case Pip.King: return "K";
          case Pip.Queen: return "Q";
          case Pip.Jack: return "J";
          default: return pip.toString();
      }
    }

    get pip() {
      return CardComponent.pipName(this.props.pip);
    }

    static key(card) {
      return CardComponent.suitName(card.suit) + CardComponent.pipName(card.pip);
    }

    render() {
      return (
        <div className="card-container">
            <div className="card-edge-left">
                <div className="card-pip-small">{this.pip}</div>
                <div className="card-suit suit-{this.suit}"></div>
            </div>

            <div className="card-pip">{this.pip}</div>

            <div className="card-edge-right">
                <div className="card-pip-small">{this.pip}</div>
                <div className="card-suit suit-{this.suit}"></div>
            </div>
        </div>
      );
    }
}
