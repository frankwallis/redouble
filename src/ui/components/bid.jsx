/* @flow */

import React from 'react';
import {BidType, BidSuit, Bid} from '../../model/core/bid';

export class BidComponent extends React.Component {

    constructor(props) {
      super(props);
    }

    static key(bid) {
      switch(bid.type) {
        case BidType.NoBid:
          return "No Bid";
        case BidType.Call:
          return Bid.key(bid);
        case BidType.Double:
          return "Double";
        case BidType.Redouble:
          return "Redouble";
        default:
          throw new Error("unrecognised bid");
      }
    }

    render() {
      switch(this.props.bid.type) {
        case BidType.NoBid:
          return <div className="bid-container">No Bid</div>;
        case BidType.Call:
          return (
            <div className="bid-container">
              <span className="bid-level">{this.props.bid.level}</span>
              <span className={"bid-suit suit-" + Bid.suitName(this.props.bid.suit)}></span>
            </div>
        );
        case BidType.Double:
          return <div className="bid-container">Double</div>;
        case BidType.Redouble:
          return <div className="bid-container">Redouble</div>;
        default:
           throw new Error("unrecognised bid");
      }
    }
}

BidComponent.propTypes = {
   bid: React.PropTypes.object.isRequired
}

