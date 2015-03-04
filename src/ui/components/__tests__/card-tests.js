jest.autoMockOff()

import {CardComponent} from "../card.jsx";
import {Card, Pip, Suit} from "../../../model/core/card";

import React from "react/addons";
var TestUtils = React.addons.TestUtils;

describe('Card', () => {

   it('displays the pip for aces', () => {
      var card = { pip: Pip.Ace, suit: Suit.Spades };
      var cardComponent = TestUtils.renderIntoDocument(<CardComponent card={card}/>);
      //
      var cardtext = TestUtils.findRenderedDOMComponentWithClass(cardComponent, 'card-pip');
      expect(cardtext.getDOMNode().textContent).toBe("A");
   });

   it('displays the pip for plain cards', () => {
      var card = { pip: Pip.Eight, suit: Suit.Spades };
      var cardComponent = TestUtils.renderIntoDocument(<CardComponent card={card}/>);
      //
      var cardtext = TestUtils.findRenderedDOMComponentWithClass(cardComponent, 'card-pip');
      expect(cardtext.getDOMNode().textContent).toBe("8");
   });

   xit('displays the right number of pips', () => {
      var bid = { type: BidType.Double };
      var bidComponent = TestUtils.renderIntoDocument(<BidComponent bid={bid}/>);
      //
      var bidtext = TestUtils.findRenderedDOMComponentWithClass(bidComponent, 'bid-container');
      expect(bidtext.getDOMNode().textContent).toBe("Double");
   });

   it('displays the suit', () => {
      var card = { pip: Pip.Eight, suit: Suit.Spades };
      var cardComponent = TestUtils.renderIntoDocument(<CardComponent card={card}/>);
      //
      var suits = TestUtils.scryRenderedDOMComponentsWithClass(cardComponent, 'card-suit');
      expect(suits.length).toBeGreaterThan(0);
      expect(suits[0].getDOMNode().className).toContain("suit-spades");
   });

});
