jest.autoMockOff()
jest.mock('../../../stores/game-store');
jest.mock('../../../stores/auto-player.js');

import {BiddingBox} from "../bidding-box.jsx";
import {Game} from "../../../model/game/game-state";
import {GameActions} from "../../../stores/game-store";

import React from "react/addons";
const TestUtils = React.addons.TestUtils;

describe('Bidding Box', () => {

	it('displays the right number of buttons', () => {
		let game = new Game().dealBoard();
		let biddingbox = TestUtils.renderIntoDocument(<BiddingBox game={game}/>);

		let buttons = TestUtils.scryRenderedDOMComponentsWithTag(biddingbox, 'button');
		expect(buttons.length).toEqual(38);
	});

	xit('disables buttons which are invalid', () => {
		// TODO
	});

	it('makes a bid when a button is clicked', () => {
		let game = new Game().dealBoard();
		let biddingbox = TestUtils.renderIntoDocument(<BiddingBox game={game}/>);

		let buttons = TestUtils.scryRenderedDOMComponentsWithTag(biddingbox, 'button');
		TestUtils.Simulate.click(buttons[0]);
		expect(GameActions.makeBid.mock.calls.length).toEqual(1);
	});

});
