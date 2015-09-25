import {CardComponent} from "../../components/card.jsx";
import {HandComponent} from "../hand.jsx";
import {BoardBuilder} from "../../../model/game/board-builder";
import {Seat} from "../../../model/core/seat";
import {Bid} from "../../../model/core/bid";

import React from "react/addons";
const TestUtils = React.addons.TestUtils;

describe('Hand Component', () => {

	it('displays cards which are available', () => {
		let board = BoardBuilder.create().toQuery();
		let component = <HandComponent board={board} seat={Seat.North} playCard={() => {}}/>;
		let hand = TestUtils.renderIntoDocument(component);

		let buttons = TestUtils.scryRenderedDOMComponentsWithTag(hand, 'button');
		expect(buttons.length).to.equal(13);
	});

	it('hides cards which have been played', () => {
		let boardBuilder = BoardBuilder.create(Seat.North);
		let board = boardBuilder.toQuery();
		let component = <HandComponent board={board} seat={Seat.East} playCard={() => {}}/>;
		let hand = TestUtils.renderIntoDocument(component);

		let cards = TestUtils.scryRenderedComponentsWithType(hand, CardComponent);
		expect(cards.length).to.equal(13);

		boardBuilder = boardBuilder
			.makeBid("1H")
			.makeBid("no bid")
			.makeBid("no bid")
			.makeBid("no bid");

		board = boardBuilder.toQuery();
		expect(board.nextPlayer).to.equal(Seat.East);
		board = boardBuilder.playCard(board.hands[Seat.East][0]).toQuery();
		component = <HandComponent board={board} seat={Seat.East} playCard={() => {}}/>;
		hand = TestUtils.renderIntoDocument(component);

		cards = TestUtils.scryRenderedComponentsWithType(hand, CardComponent);
		expect(cards.length).to.equal(12);
	});

	it('sorts the cards', () => {
		let board = BoardBuilder.create(Seat.North).toQuery();
		let component = <HandComponent board={board} seat={Seat.North} playCard={() => {}}/>;
		let hand = TestUtils.renderIntoDocument(component);

		let buttons = TestUtils.scryRenderedDOMComponentsWithTag(hand, 'button');
		expect(buttons.length).to.equal(13);

		let suits = false;
		buttons.reduce((prev, current) => {
			if (!suits || (prev.suit !== current.suit)) {
				suits = suits || {};
				expect(suits[current.suit]).to.be.undefined;
				suits[current.suit] = true;
			}
			return current;
		});
	});

	it('plays a card when a button is clicked', () => {
		let board = BoardBuilder.create(Seat.North).toQuery();
		let playCardSpy = sinon.spy();
		let component = <HandComponent board={board} seat={Seat.North} playCard={playCardSpy}/>;
		let hand = TestUtils.renderIntoDocument(component);

		let buttons = TestUtils.scryRenderedDOMComponentsWithTag(hand, 'button');
		expect(buttons.length).to.equal(13);
		expect(playCardSpy.callCount).to.equal(0);
		TestUtils.Simulate.click(buttons[0]);
		expect(playCardSpy.callCount).to.equal(1);
	});
});
