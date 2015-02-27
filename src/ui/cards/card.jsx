/// <reference path="../../_references.d.ts" />

import React from 'react';

export class Card extends React.Component {

    constructor(props) {
      super(props);
    }

    static suitName(suit) {
      switch(suit) {
          case tower.BidSuit.Spades: return "spades";
          case tower.BidSuit.Hearts: return "hearts";
          case tower.BidSuit.Diamonds: return "diamonds";
          case tower.BidSuit.Clubs: return "clubs";
          case tower.BidSuit.NoTrumps: return "no-trumps";
          default: return "unknown";
      }
    }

    get suit() {
      return Card.suitName(this.props.suit);
    }

    static pipName(pip) {
      switch(pip) {
          case tower.Pip.Ace: return "A";
          case tower.Pip.King: return "K";
          case tower.Pip.Queen: return "Q";
          case tower.Pip.Jack: return "J";
          default: return pip.toString();
      }
    }

    get pip() {
      return Card.pipName(this.props.pip);
    }

    static key(card) {
      return Card.suitName(card.suit) + Card.pipName(card.pip);
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
