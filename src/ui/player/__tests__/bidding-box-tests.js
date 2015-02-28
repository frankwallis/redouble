jest.autoMockOff()

import {BiddingBox} from "../bidding-box.jsx";
import {GameStateHelper} from "../../../model/gameplay-generators/game-state-helper";

import React from "react/addons";

describe('currentBoard', () => {
  it('returns the last board', () => {
      var TestUtils = React.addons.TestUtils;

      var game = new GameStateHelper().newBoard();
      var stateChanged = jest.genMockFunction();

      // Render a bidding-box
      var biddingbox = TestUtils.renderIntoDocument(
         <BiddingBox game={game} onGameStateChanged={stateChanged}/>
      );

      // Verify that the double button is there
      var buttons = TestUtils.scryRenderedDOMComponentsWithTag(biddingbox, 'button');
      expect(buttons.length).toEqual(38);

      //expect(double.getDOMNode().textContent).toEqual('Double');

      TestUtils.Simulate.click(buttons[0]);
      expect(stateChanged.mock.calls.length).toEqual(1);
  });
});
