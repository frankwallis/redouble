import {BiddingBox} from "../bidding-box.jsx";
import {GameBuilder} from "../../../model/game/game-builder";

import React from "react/addons";
const TestUtils = React.addons.TestUtils;

describe('Bidding Box', () => {

	it('displays the right number of buttons', () => {
		let game = GameBuilder.create().dealBoard().build();
		let biddingbox = TestUtils.renderIntoDocument(<BiddingBox game={game} makeBid={() => {}}/>);

		let buttons = TestUtils.scryRenderedDOMComponentsWithTag(biddingbox, 'button');
		expect(buttons.length).toEqual(38);
	});

	xit('disables buttons which are invalid', () => {
		// TODO
	});

	it('makes a bid when a button is clicked', () => {
		let game = GameBuilder.create().dealBoard().build();
		let makeBidSpy = jasmine.createSpy();
		let biddingbox = TestUtils.renderIntoDocument(<BiddingBox game={game} makeBid={makeBidSpy}/>);

		let buttons = TestUtils.scryRenderedDOMComponentsWithTag(biddingbox, 'button');
		expect(makeBidSpy.calls.count()).toEqual(0);
		TestUtils.Simulate.click(buttons[0]);
		expect(makeBidSpy.calls.count()).toEqual(1);
	});

});
