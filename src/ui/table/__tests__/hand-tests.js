jest.autoMockOff()
jest.mock('../../../stores/game-store');

import {CardComponent} from "../../components/card.jsx";
import {HandComponent} from "../hand.jsx";
import {GameStateHelper} from "../../../model/game/game-state";
import {GameActions} from "../../../stores/game-store";
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

      var cards = TestUtils.scryRenderedComponentsWithType(hand, CardComponent);
      expect(cards.length).toEqual(13);

      // play a card
      game.currentBoard.cards.push({ seat: Seat.North, card: cards[0].props.card });
      hand = TestUtils.renderIntoDocument(<HandComponent game={game} seat={Seat.North}/>);

      cards = TestUtils.scryRenderedComponentsWithType(hand, CardComponent);
      expect(cards.length).toEqual(12);
  });

  it('sorts the cards', () => {
      var game = new GameStateHelper().newBoard();
      var hand = TestUtils.renderIntoDocument(<HandComponent game={game} seat={Seat.North}/>);

      var buttons = TestUtils.scryRenderedDOMComponentsWithTag(hand, 'button');
      expect(buttons.length).toEqual(13);

      var suits = {};
      buttons.reduce((prev, current) => {
         if (!prev || (prev.suit != current.suit)) {
            expect(suits[current.suit]).toBeUndefined();
            suits[current.suit] = true;
         }
         return current;
      })
  });

  it('plays a card when a button is clicked', () => {
     var game = new GameStateHelper().newBoard();
     var hand = TestUtils.renderIntoDocument(<HandComponent game={game} seat={Seat.North}/>);

     var buttons = TestUtils.scryRenderedDOMComponentsWithTag(hand, 'button');
     expect(buttons.length).toEqual(13);
     expect(GameActions.playCard.mock.calls.length).toBe(0);
     TestUtils.Simulate.click(buttons[0]);
     expect(GameActions.playCard.mock.calls.length).toBe(1);
  });
});
