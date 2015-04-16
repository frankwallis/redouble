jest.autoMockOff()

import {BidComponent} from  "../../components/bid.jsx";
import {BiddingHistory} from "../bidding-history.jsx";
import {GameStateHelper} from "../../../model/game/game-state";
import {Bid, BidType, BidSuit} from "../../../model/core/bid";

import React from "react/addons";
let TestUtils = React.addons.TestUtils;

describe('Bidding History', () => {

  it('displays the right headings', () => {
      let game = new GameStateHelper().newBoard();
      let biddingHistory = TestUtils.renderIntoDocument(<BiddingHistory board={game.currentBoard}/>);
      let thead = TestUtils.findRenderedDOMComponentWithTag(biddingHistory, 'thead');
      let headings = TestUtils.scryRenderedDOMComponentsWithTag(thead, 'th');

      expect(headings.length).toEqual(4);
      expect(headings[0].getDOMNode().textContent).toBe('north');
  });

  it('displays all the bids', () => {
      let game = new GameStateHelper().newBoard();
      game.currentBoard.bids.push({ type: BidType.NoBid });

      let biddingHistory = TestUtils.renderIntoDocument(<BiddingHistory board={game.currentBoard}/>);
      let tbody = TestUtils.findRenderedDOMComponentWithTag(biddingHistory, 'tbody');

      bids = TestUtils.scryRenderedComponentsWithType(tbody, BidComponent);
      expect(bids.length).toEqual(1);
  });
});
