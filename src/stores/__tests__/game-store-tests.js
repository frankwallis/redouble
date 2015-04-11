jest.autoMockOff();
//jest.dontMock('../game-store.js');

import {Bid} from '../../model/core/bid';
import {GameStore, GameActions} from '../game-store';

describe('Game Store', () => {
   beforeEach(() => {
      GameStore.reset();
   });

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
         expect(GameStore.currentState().currentBoard.bids.length).toBe(0);
         GameActions.makeBid(Bid.create("double"));
         jest.runAllTimers();
         expect(GameStore.currentState().currentBoard.bids.length).toBe(0);
      });

   });

   describe('playCard', () => {
      it('plays valid cards', () => {
         expect(GameStore.currentState().currentBoard.bids.length).toBe(0);
         GameActions.makeBid(Bid.create("1D"));
         jest.runAllTimers();
         expect(GameStore.currentState().currentBoard.bids.length).toBe(1);
      });

      it('rejects invalid cards', () => {
         expect(GameStore.currentState().currentBoard.bids.length).toBe(0);
         GameActions.makeBid(Bid.create("double"));
         jest.runAllTimers();
         expect(GameStore.currentState().currentBoard.bids.length).toBe(0);
      });
   });

});
