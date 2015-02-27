/// <reference path="../../_references.d.ts" />

import React from 'react';

export class Bid extends React.Component {

    constructor(props) {
      super(props);
      console.log('creating bid');
    }

    static key(bid) {
      switch(bid.type) {
        case tower.BidType.NoBid:
          return "No Bid";
        case tower.BidType.Call:
          return bid.level.toString() + bid.suit.toString();
        case tower.BidType.Double:
          return "Double";
        case tower.BidType.Redouble:
          return "Redouble";
        default:
          throw new Error("unrecognised bid");
      }
    }

    render() {
      switch(this.props.bid.type) {
        case tower.BidType.NoBid:
          return <div className="bid-container">No Bid</div>;
        case tower.BidType.Call:
          return (
            <div className="bid-container">
              <span className="bid-level">{this.props.bid.level}</span>
              <span className="bid-suit suit-${this.props.bid.suit}"></span>
            </div>
        );
        case tower.BidType.Double:
          return <div className="bid-container">Double</div>;
        case tower.BidType.Redouble:
          return <div className="bid-container">Redouble</div>;
        default:
           throw new Error("unrecognised bid");
      }
    }
}
