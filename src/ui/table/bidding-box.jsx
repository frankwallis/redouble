/* @flow */

import React, {Component, PropTypes} from 'react';

import {BidComponent} from '../components/bid.jsx';
import {Bid, BidSuit, BidType} from '../../model/core/bid';

import './bidding-box.css';

export class BiddingBox extends Component {

	constructor(props) {
		super(props);
	}

	static propTypes = {
		makeBid: PropTypes.func.isRequired
  	};

	bidButton(bid) {
		let bidClassName = "bidding-box-button pure-button";

		if (bid.type !== BidType.Call)
			bidClassName = bidClassName + " bidding-box-button-special";

		return (
			<button className={bidClassName}
						key={Bid.stringify(bid)}
						onClick={() => this.props.makeBid(bid)}>
				<BidComponent bid={bid}/>
			</button>
		);
	}

	render() {
		console.log('rendering bidding-box');

		/* arrange all the bids into rows */
		let rows = [1, 2, 3, 4, 5, 6, 7]
			.map((level) => BidSuit.all().map((suit) => {
				return {type: BidType.Call, suit, level};
			}));

		rows.push([
				{type: BidType.Double},
				{type: BidType.Redouble},
				{type: BidType.NoBid}
			]);

		/* convert to buttons */
		rows = rows.map((bids) => bids.map((bid) => this.bidButton(bid)));

		/* and wrap each row with a div */
		rows = rows.map((row, idx) => {
         return (
            <div key={"row" + idx} className="bidding-box-row">
               {row}
            </div>
         );
      });

		return (
			<div className="bidding-box-container">
				{rows}
			</div>
		);
	}
}
