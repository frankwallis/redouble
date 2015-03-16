jest.autoMockOff();
//jest.dontMock('../game-store.js');

import {Bid} from '../../model/core/bid';
import {GameStore, GameActions} from '../game-store';

describe('Game Store', () => {
   describe('newBoard', () => {
      it('creates a new board', () => {

      });
   });

   describe('makeBid', () => {
      it('makes valid bids', () => {
         expect(GameStore.currentState().currentBoard.bids.length).toBe(0);
         GameActions.makeBid(Bid.create("1D"));
         jest.runAllTimers();
         expect(GameStore.currentState().currentBoard.bids.length).toBe(1);
      });

      it('rejects invalid bids', () => {

      });
   });

   describe('playCard', () => {

   });

});
