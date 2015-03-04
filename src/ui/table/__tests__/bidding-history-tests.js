jest.autoMockOff()
jest.mock('../../../model/game/game-store');

import {BidComponent} from  "../../components/bid.jsx";
import {BiddingHistory} from "../bidding-history.jsx";
import {GameStateHelper} from "../../../model/game/game-state";
import {Bid, BidType, BidSuit} from "../../../model/core/bid";

import React from "react/addons";
var TestUtils = React.addons.TestUtils;

describe('Bidding History', () => {

  it('displays the right headings', () => {
      var game = new GameStateHelper().newBoard();
      var biddingHistory = TestUtils.renderIntoDocument(<BiddingHistory board={game.currentBoard}/>);
      var thead = TestUtils.findRenderedDOMComponentWithTag(biddingHistory, 'thead');
      var headings = TestUtils.scryRenderedDOMComponentsWithTag(thead, 'th');

      expect(headings.length).toEqual(4);
      expect(headings[0].getDOMNode().textContent).toBe('north');
  });

  it('displays all the bids', () => {
      var game = new GameStateHelper().newBoard();
      game.currentBoard.bids.push({ type: BidType.NoBid });

      var biddingHistory = TestUtils.renderIntoDocument(<BiddingHistory board={game.currentBoard}/>);
      var tbody = TestUtils.findRenderedDOMComponentWithTag(biddingHistory, 'tbody');

      bids = TestUtils.scryRenderedComponentsWithType(tbody, BidComponent);
      expect(bids.length).toEqual(1);
  });
});
