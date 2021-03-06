/* @flow */

import React from 'react';
import {PureComponent} from 'react-pure-render';
import {BidType, Bid} from '../../model/core/bid';

if (process.env.__BROWSER__) {
	require('./bid.css');
}

class BidComponent extends PureComponent {

	constructor(props) {
		super(props);
	}

	static propTypes = {
		bid: React.PropTypes.object.isRequired
	};

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

export default BidComponent;
