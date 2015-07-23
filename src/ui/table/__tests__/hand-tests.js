import {CardComponent} from "../../components/card.jsx";
import {HandComponent} from "../hand.jsx";
import {Game} from "../../../model/game/game-state";
import {Seat} from "../../../model/core/seat";
import {Bid} from "../../../model/core/bid";

import React from "react/addons";
const TestUtils = React.addons.TestUtils;

describe('Hand Component', () => {

	it('displays cards which are available', () => {
		let game = new Game().dealBoard();
		let component = <HandComponent board={game.currentBoard} seat={Seat.North} playCard={() => {}}/>;
		let hand = TestUtils.renderIntoDocument(component);

		let buttons = TestUtils.scryRenderedDOMComponentsWithTag(hand, 'button');
		expect(buttons.length).toEqual(13);
	});

	it('hides cards which have been played', () => {
		let board = new Game().dealBoard(Seat.North).currentBoard;
		let component = <HandComponent board={board} seat={Seat.East} playCard={() => {}}/>;
		let hand = TestUtils.renderIntoDocument(component);

		let cards = TestUtils.scryRenderedComponentsWithType(hand, CardComponent);
		expect(cards.length).toEqual(13);

		board = board
			.makeBid(Bid.create("1H"))
			.makeBid(Bid.create("no bid"))
			.makeBid(Bid.create("no bid"))
			.makeBid(Bid.create("no bid"));

		expect(board.nextPlayer).toEqual(Seat.East);
		board = board.playCard(board.hands[Seat.East][0]);
		component = <HandComponent board={board} seat={Seat.East} playCard={() => {}}/>;
		hand = TestUtils.renderIntoDocument(component);

		cards = TestUtils.scryRenderedComponentsWithType(hand, CardComponent);
		expect(cards.length).toEqual(12);
	});

	it('sorts the cards', () => {
		let game = new Game().dealBoard();
		let component = <HandComponent board={game.currentBoard} seat={Seat.North} playCard={() => {}}/>;
		let hand = TestUtils.renderIntoDocument(component);

		let buttons = TestUtils.scryRenderedDOMComponentsWithTag(hand, 'button');
		expect(buttons.length).toEqual(13);

		let suits = {};
		buttons.reduce((prev, current) => {
			if (!prev || (prev.suit !== current.suit)) {
				expect(suits[current.suit]).toBeUndefined();
				suits[current.suit] = true;
			}
			return current;
		});
	});

	it('plays a card when a button is clicked', () => {
		let game = new Game().dealBoard();
		let playCardSpy = jasmine.createSpy('Play Card Spy');
		let component = <HandComponent board={game.currentBoard} seat={Seat.North} playCard={playCardSpy}/>;
		let hand = TestUtils.renderIntoDocument(component);

		let buttons = TestUtils.scryRenderedDOMComponentsWithTag(hand, 'button');
		expect(buttons.length).toEqual(13);
		expect(playCardSpy.calls.count()).toBe(0);
		TestUtils.Simulate.click(buttons[0]);
		expect(playCardSpy.calls.count()).toBe(1);
	});
});
