jest.autoMockOff()

import {BidComponent} from "../bid.jsx";
import {Bid, BidType, BidSuit} from "../../../model/core/bid";

import React from "react/addons";
const TestUtils = React.addons.TestUtils;

describe('Bid', () => {

   it('displays no trumps', () => {
      let bid = { type: BidType.Call, suit: BidSuit.NoTumps, level: 3 };
      let bidComponent = TestUtils.renderIntoDocument(<BidComponent bid={bid}/>);
      //
      let bidtext = TestUtils.findRenderedDOMComponentWithClass(bidComponent, 'bid-container');
      expect(bidtext.getDOMNode().textContent).toBe("3");
   });

   it('displays no bid', () => {
      let bid = { type: BidType.NoBid };
      let bidComponent = TestUtils.renderIntoDocument(<BidComponent bid={bid}/>);
      //
      let bidtext = TestUtils.findRenderedDOMComponentWithClass(bidComponent, 'bid-container');
      expect(bidtext.getDOMNode().textContent).toBe("No Bid");
   });

   it('displays double', () => {
      let bid = { type: BidType.Double };
      let bidComponent = TestUtils.renderIntoDocument(<BidComponent bid={bid}/>);
      //
      let bidtext = TestUtils.findRenderedDOMComponentWithClass(bidComponent, 'bid-container');
      expect(bidtext.getDOMNode().textContent).toBe("Double");
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
