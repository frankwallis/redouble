import {CardComponent} from "../card.jsx";
import {Pip, Suit} from "../../../model/core/card";
import {BidType} from "../../../model/core/bid";

import React from "react/addons";
const TestUtils = React.addons.TestUtils;

describe('Card', () => {

	it('displays the pip for aces', () => {
		let card = { pip: Pip.Ace, suit: Suit.Spades };
		let cardComponent = TestUtils.renderIntoDocument(<CardComponent card={card}/>);
		//
		let cardtext = TestUtils.findRenderedDOMComponentWithClass(cardComponent, 'card-pip');
		expect(cardtext.textContent).to.equal("A");
	});

	it('displays the pip for plain cards', () => {
		let card = { pip: Pip.Eight, suit: Suit.Spades };
		let cardComponent = TestUtils.renderIntoDocument(<CardComponent card={card}/>);
		//
		let cardtext = TestUtils.findRenderedDOMComponentWithClass(cardComponent, 'card-pip');
		expect(cardtext.textContent).to.equal("8");
	});

	xit('displays the right number of pips', () => {
		let bid = { type: BidType.Double };
		let bidComponent = TestUtils.renderIntoDocument(<BidComponent bid={bid}/>);
		//
		let bidtext = TestUtils.findRenderedDOMComponentWithClass(bidComponent, 'bid-container');
		expect(bidtext.getDOMNode().textContent).to.equal("Double");
	});

	it('displays the suit', () => {
		let card = { pip: Pip.Eight, suit: Suit.Spades };
		let cardComponent = TestUtils.renderIntoDocument(<CardComponent card={card}/>);
		//
		let suits = TestUtils.scryRenderedDOMComponentsWithClass(cardComponent, 'card-suit');
		expect(suits.length).to.be.least(0);
		expect(suits[0].className).to.have.string("suit-spades");
	});

});
