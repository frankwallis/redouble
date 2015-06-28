jest.autoMockOff()

import {BidComponent} from  "../../components/bid.jsx";
import {BiddingHistory} from "../bidding-history.jsx";
import {Board} from "../../../model/game/board-state";
import {Bid, BidType, BidSuit} from "../../../model/core/bid";
import {Seat} from "../../../model/core/seat";

import React from "react/addons";
let TestUtils = React.addons.TestUtils;

describe('Bidding History', () => {

   it('displays the right headings', () => {
      let board = new Board({ dealer: Seat.West, bids: [], cards: [] })
      let biddingHistory = TestUtils.renderIntoDocument(<BiddingHistory board={board}/>);
      let thead = TestUtils.findRenderedDOMComponentWithTag(biddingHistory, 'thead');
      let headings = TestUtils.scryRenderedDOMComponentsWithTag(thead, 'th');

      expect(headings.length).toEqual(4);
      expect(headings[0].getDOMNode().textContent).toBe('north');
   });

   it('displays all the bids', () => {
      let board = new Board({ dealer: Seat.West, bids: [], cards: [] })
         .makeBid(Bid.create("no bid"))

      let biddingHistory = TestUtils.renderIntoDocument(<BiddingHistory board={board}/>);
      let tbody = TestUtils.findRenderedDOMComponentWithTag(biddingHistory, 'tbody');

      let bids = TestUtils.scryRenderedComponentsWithType(tbody, BidComponent);
      expect(bids.length).toEqual(1);
  });
});
