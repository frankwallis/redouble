import React from "react";
import TestUtils from "react-addons-test-utils";

import BidComponent from "../bid.jsx";
import {BidType, BidSuit} from "../../../model/core/bid";

describe('Bid', () => {

	it('displays no trumps', () => {
		let bid = { type: BidType.Call, suit: BidSuit.NoTumps, level: 3 };
		let bidComponent = TestUtils.renderIntoDocument(<BidComponent bid={bid}/>);
		//
		let bidtext = TestUtils.findRenderedDOMComponentWithClass(bidComponent, 'bid-container');
		expect(bidtext.textContent).to.equal("3");
	});

	it('displays no bid', () => {
		let bid = { type: BidType.NoBid };
		let bidComponent = TestUtils.renderIntoDocument(<BidComponent bid={bid}/>);
		//
		let bidtext = TestUtils.findRenderedDOMComponentWithClass(bidComponent, 'bid-container');
		expect(bidtext.textContent).to.equal("No Bid");
	});

	it('displays double', () => {
		let bid = { type: BidType.Double };
		let bidComponent = TestUtils.renderIntoDocument(<BidComponent bid={bid}/>);
		//
		let bidtext = TestUtils.findRenderedDOMComponentWithClass(bidComponent, 'bid-container');
		expect(bidtext.textContent).to.equal("Double");
	});

	it('errors for invalid bids', () => {
		// try {
		//    let bid = { type: BidType.Call, suit: BidSuit.Diamonds, level: 8 };
		//    let bidComponent = TestUtils.renderIntoDocument(<BidComponent bid={bid}/>);
		//    //
		//    let bidtext = TestUtils.findRenderedDOMComponentWithClass(bidComponent, 'bid-container');
		//    expect(bidtext).toBe("Double");
		// }
		// catch(err) {
		//    console.log(JSON.stringify(err));
		// }
	});

});
