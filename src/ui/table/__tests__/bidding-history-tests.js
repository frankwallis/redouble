import {BidComponent} from "../../components/bid.jsx";
import {BiddingHistory} from "../bidding-history.jsx";
import {BoardBuilder} from "../../../model/game/board-builder";
import {Bid} from "../../../model/core/bid";

import React from "react/addons";
const TestUtils = React.addons.TestUtils;

describe('Bidding History', () => {

	it('displays the right headings', () => {
		let board = BoardBuilder.create().toQuery();
		let biddingHistory = TestUtils.renderIntoDocument(<BiddingHistory board={board}/>);
		let headings = TestUtils.scryRenderedDOMComponentsWithTag(biddingHistory, 'th');

		expect(headings.length).toEqual(4);
		expect(headings[0].getDOMNode().textContent).toBe('north');
	});

	it('displays all the bids', () => {
		let board = BoardBuilder
			.create()
			.makeBid(Bid.create("no bid"))
			.toQuery();

		let biddingHistory = TestUtils.renderIntoDocument(<BiddingHistory board={board}/>);
		let bids = TestUtils.scryRenderedComponentsWithType(biddingHistory, BidComponent);
		expect(bids.length).toEqual(1);
  });
});
