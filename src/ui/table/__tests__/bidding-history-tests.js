jest.autoMockOff()
jest.mock('../../../model/game/game-store');

import {BiddingHistory} from "../bidding-history.jsx";
import {GameStateHelper} from "../../../model/game/game-state";

import React from "react/addons";
var TestUtils = React.addons.TestUtils;

describe('Bidding History', () => {

  it('displays the right headings', () => {
      var game = new GameStateHelper().newBoard();
      var biddingHistory = TestUtils.renderIntoDocument(<BiddingHistory board={game.currentBoard}/>);

      // var buttons = TestUtils.scryRenderedDOMComponentsWithTag(biddingbox, 'button');
      // expect(buttons.length).toEqual(38);
  });

  it('displays all the bids', () => {
      var game = new GameStateHelper().newBoard();
      var biddingHistory = TestUtils.renderIntoDocument(<BiddingHistory board={game.currentBoard}/>);

      // var buttons = TestUtils.scryRenderedDOMComponentsWithTag(biddingbox, 'button');
      // expect(buttons.length).toEqual(38);
  });
});
