jest.autoMockOff()
jest.mock('../../../stores/game-store.js');
jest.mock('../../../stores/auto-player.js');

import {GameActions} from "../../../stores/game-store";
import {CardComponent} from "../../components/card.jsx";
import {HandComponent} from "../hand.jsx";
import {Game} from "../../../model/game/game-state";
import {Seat} from "../../../model/core/seat";
import {Bid} from "../../../model/core/bid";

import React from "react/addons";
const TestUtils = React.addons.TestUtils;

describe('Hand Component', () => {

   it('displays cards which are available', () => {
      let game = new Game().dealBoard();
      let hand = TestUtils.renderIntoDocument(<HandComponent board={game.currentBoard} seat={Seat.North}/>);

      let buttons = TestUtils.scryRenderedDOMComponentsWithTag(hand, 'button');
      expect(buttons.length).toEqual(13);
   });

   it('hides cards which have been played', () => {
      let board = new Game().dealBoard(Seat.North).currentBoard;
      let hand = TestUtils.renderIntoDocument(<HandComponent board={board} seat={Seat.East}/>);

      let cards = TestUtils.scryRenderedComponentsWithType(hand, CardComponent);
      expect(cards.length).toEqual(13);

      board = board
        .makeBid(Bid.create("1H"))
        .makeBid(Bid.create("no bid"))
        .makeBid(Bid.create("no bid"))
        .makeBid(Bid.create("no bid"));

      expect(board.nextPlayer).toEqual(Seat.East);
      board = board.playCard(board.hands[Seat.East][0]);
      hand = TestUtils.renderIntoDocument(<HandComponent board={board} seat={Seat.East}/>);

      cards = TestUtils.scryRenderedComponentsWithType(hand, CardComponent);
      expect(cards.length).toEqual(12);
   });

   it('sorts the cards', () => {
      let game = new Game().dealBoard();
      let hand = TestUtils.renderIntoDocument(<HandComponent board={game.currentBoard} seat={Seat.North}/>);

      let buttons = TestUtils.scryRenderedDOMComponentsWithTag(hand, 'button');
      expect(buttons.length).toEqual(13);

      let suits = {};
      buttons.reduce((prev, current) => {
         if (!prev || (prev.suit != current.suit)) {
            expect(suits[current.suit]).toBeUndefined();
            suits[current.suit] = true;
         }
         return current;
      })
   });

   it('plays a card when a button is clicked', () => {
      let game = new Game().dealBoard();
      let hand = TestUtils.renderIntoDocument(<HandComponent board={game.currentBoard} seat={Seat.North}/>);

      let buttons = TestUtils.scryRenderedDOMComponentsWithTag(hand, 'button');
      expect(buttons.length).toEqual(13);
      expect(GameActions.playCard.mock.calls.length).toBe(0);
      TestUtils.Simulate.click(buttons[0]);
      expect(GameActions.playCard.mock.calls.length).toBe(1);
   });
});
