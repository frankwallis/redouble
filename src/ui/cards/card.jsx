/// <reference path="../../_references.d.ts" />

import React from 'react';

export class Card extends React.Component {

    constructor(props) {
      super(props);
    }

    // toView(value: tower.Pip, option){
    //   switch(value) {
    //       case tower.Pip.Ace: return "A";
    //       case tower.Pip.King: return "K";
    //       case tower.Pip.Queen: return "Q";
    //       case tower.Pip.Jack: return "J";
    //       default: return value.toString();
    //   }
    // }

    // toView(value: tower.BidSuit, option){
    //   switch(value) {
    //       case tower.BidSuit.Spades: return "spades";
    //       case tower.BidSuit.Hearts: return "hearts";
    //       case tower.BidSuit.Diamonds: return "diamonds";
    //       case tower.BidSuit.Clubs: return "clubs";
    //       case tower.BidSuit.NoTrumps: return "no-trumps";
    //       default: return "unknown";
    //   }
    // }


    render() {
      return (
        <div className="card-container">
            <div className="card-edge-left">
                <div className="card-pip-small">${card.pip}</div>
                <div className="card-suit suit-${card.suit}"></div>
            </div>

            <div className="card-pip">${card.pip | towerPipName}</div>

            <div className="card-edge-right">
                <div className="card-pip-small">${card.pip | towerPipName}</div>
                <div className="card-suit suit-${card.suit | towerSuitName}"></div>
            </div>
        </div>
      );
    }
}
