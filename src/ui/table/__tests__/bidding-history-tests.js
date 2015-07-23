import {BidComponent} from "../../components/bid.jsx";
import {BiddingHistory} from "../bidding-history.jsx";
import {Board} from "../../../model/game/board-state";
import {Bid} from "../../../model/core/bid";

import React from "react/addons";
const TestUtils = React.addons.TestUtils;

describe('Bidding History', () => {

	it('displays the right headings', () => {
		let board = Board.create();
		let biddingHistory = TestUtils.renderIntoDocument(<BiddingHistory board={board}/>);
		let headings = TestUtils.scryRenderedDOMComponentsWithTag(biddingHistory, 'th');

		expect(headings.length).toEqual(4);
		expect(headings[0].getDOMNode().textContent).toBe('north');
	});

	it('displays all the bids', () => {
		let board = Board.create()
			.makeBid(Bid.create("no bid"));

		let biddingHistory = TestUtils.renderIntoDocument(<BiddingHistory board={board}/>);
		let bids = TestUtils.scryRenderedComponentsWithType(biddingHistory, BidComponent);
		expect(bids.length).toEqual(1);
  });
});
