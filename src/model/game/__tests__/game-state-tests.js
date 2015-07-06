jest.autoMockOff()
jest.mock("../validators", {
   validateBid: () => {},
   validateCard: () => {}
})

import {Game} from '../game-state';
import {Bid, BidType, BidSuit} from '../../core/bid';
import {Card, Pip, Suit} from '../../core/card';
import {Seat} from '../../core/seat';

describe('Game State Helper', () => {
   describe('currentBoard', () => {
      it('returns the last board', () => {
         let game = new Game();
         expect(game.currentBoard).not.toBeDefined();

         game = game.dealBoard();
         expect(game.currentBoard).toBeDefined();

         let lastBoard = game.currentBoard;
         game = game.dealBoard();
         expect(game.currentBoard).toBeDefined();
         expect(game.currentBoard).not.toBe(lastBoard);
      });
   });


   describe('dealBoard', () => {

   });

   describe('playCard', () => {

   });

   describe('makeBid', () => {

   });

   describe('gameHasEnded', () => {

   });

});
