jest.autoMockOff()
jest.mock('../../../stores/game-store');

import {BiddingBox} from "../bidding-box.jsx";
import {GameStateHelper} from "../../../model/game/game-state";
import {GameActions} from "../../../stores/game-store";

import React from "react/addons";
let TestUtils = React.addons.TestUtils;

describe('Bidding Box', () => {

  it('displays the right number of buttons', () => {
      let game = new GameStateHelper().newBoard();
      let biddingbox = TestUtils.renderIntoDocument(<BiddingBox game={game}/>);

      let buttons = TestUtils.scryRenderedDOMComponentsWithTag(biddingbox, 'button');
      expect(buttons.length).toEqual(38);
  });

  it('disables buttons which are invalid', () => {
      let game = new GameStateHelper({board: { biding: [] }});
      let biddingbox = TestUtils.renderIntoDocument(<BiddingBox game={game}/>);

      let buttons = TestUtils.scryRenderedDOMComponentsWithTag(biddingbox, 'button');
      expect(buttons.length).toEqual(38);
  });

  it('makes a bid when a button is clicked', () => {
      let game = new GameStateHelper({board: { biding: [] }});
      let biddingbox = TestUtils.renderIntoDocument(<BiddingBox game={game}/>);

      let buttons = TestUtils.scryRenderedDOMComponentsWithTag(biddingbox, 'button');
      TestUtils.Simulate.click(buttons[0]);
      expect(GameActions.makeBid.mock.calls.length).toEqual(1);
  });

});
