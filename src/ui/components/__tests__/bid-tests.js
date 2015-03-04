jest.autoMockOff()

import {BidComponent} from "../bid.jsx";
import {Bid, BidType, BidSuit} from "../../../model/core/bid";

import React from "react/addons";
var TestUtils = React.addons.TestUtils;

describe('Bid', () => {

   it('displays no trumps', () => {
      var bid = { type: BidType.Call, suit: BidSuit.NoTumps, level: 3 };
      var bidComponent = TestUtils.renderIntoDocument(<BidComponent bid={bid}/>);
      //
      var bidtext = TestUtils.findRenderedDOMComponentWithClass(bidComponent, 'bid-container');
      expect(bidtext.getDOMNode().textContent).toBe("3");
   });

   it('displays no bid', () => {
      var bid = { type: BidType.NoBid };
      var bidComponent = TestUtils.renderIntoDocument(<BidComponent bid={bid}/>);
      //
      var bidtext = TestUtils.findRenderedDOMComponentWithClass(bidComponent, 'bid-container');
      expect(bidtext.getDOMNode().textContent).toBe("No Bid");
   });

   it('displays double', () => {
      var bid = { type: BidType.Double };
      var bidComponent = TestUtils.renderIntoDocument(<BidComponent bid={bid}/>);
      //
      var bidtext = TestUtils.findRenderedDOMComponentWithClass(bidComponent, 'bid-container');
      expect(bidtext.getDOMNode().textContent).toBe("Double");
   });

   it('errors for invalid bids', () => {
      // try {
      //    var bid = { type: BidType.Call, suit: BidSuit.Diamonds, level: 8 };
      //    var bidComponent = TestUtils.renderIntoDocument(<BidComponent bid={bid}/>);
      //    //
      //    var bidtext = TestUtils.findRenderedDOMComponentWithClass(bidComponent, 'bid-container');
      //    expect(bidtext).toBe("Double");
      // }
      // catch(err) {
      //    console.log(JSON.stringify(err));
      // }
   });

});
