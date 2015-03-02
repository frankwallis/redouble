jest.autoMockOff()
jest.mock('../../../model/game/game-store');

import {HandComponent} from "../hand.jsx";
import {GameStateHelper} from "../../../model/game/game-state";
import {Seat} from "../../../model/core/seat";

import React from "react/addons";
var TestUtils = React.addons.TestUtils;

describe('Hand Component', () => {

  it('displays cards which are available', () => {
      var game = new GameStateHelper().newBoard();
      var hand = TestUtils.renderIntoDocument(<HandComponent game={game} seat={Seat.North}/>);

      var buttons = TestUtils.scryRenderedDOMComponentsWithTag(hand, 'button');
      expect(buttons.length).toEqual(13);
  });

  it('hides cards which are not available', () => {
      var game = new GameStateHelper().newBoard();
      var hand = TestUtils.renderIntoDocument(<HandComponent game={game} seat={Seat.North}/>);

      var buttons = TestUtils.scryRenderedDOMComponentsWithTag(hand, 'button');
      expect(buttons.length).toEqual(13);
  });

  it('plays a card when a button is clicked', () => {
     var game = new GameStateHelper().newBoard();
     var hand = TestUtils.renderIntoDocument(<HandComponent game={game} seat={Seat.North}/>);

     var buttons = TestUtils.scryRenderedDOMComponentsWithTag(hand, 'button');
     expect(buttons.length).toEqual(13);
  });
});
