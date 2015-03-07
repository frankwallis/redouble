jest.autoMockOff()
jest.mock('../../../stores/game-store');

import {BiddingBox} from "../bidding-box.jsx";
import {GameStateHelper} from "../../../model/game/game-state";
import {GameActions} from "../../../stores/game-store";

import React from "react/addons";
var TestUtils = React.addons.TestUtils;

describe('Bidding Box', () => {

  it('displays the right number of buttons', () => {
      var game = new GameStateHelper().newBoard();
      var biddingbox = TestUtils.renderIntoDocument(<BiddingBox game={game}/>);

      var buttons = TestUtils.scryRenderedDOMComponentsWithTag(biddingbox, 'button');
      expect(buttons.length).toEqual(38);
  });

  it('disables buttons which are invalid', () => {
      var game = new GameStateHelper({board: { biding: [] }});
      var biddingbox = TestUtils.renderIntoDocument(<BiddingBox game={game}/>);

      var buttons = TestUtils.scryRenderedDOMComponentsWithTag(biddingbox, 'button');
      expect(buttons.length).toEqual(38);
  });

  it('makes a bid when a button is clicked', () => {
      var game = new GameStateHelper({board: { biding: [] }});
      var biddingbox = TestUtils.renderIntoDocument(<BiddingBox game={game}/>);

      var buttons = TestUtils.scryRenderedDOMComponentsWithTag(biddingbox, 'button');
      TestUtils.Simulate.click(buttons[0]);
      expect(GameActions.makeBid.mock.calls.length).toEqual(1);
  });

});
