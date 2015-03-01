jest.dontMock('../game-state.js');

import {GameStateHelper} from '../game-state';

describe('currentBoard', () => {
   it('returns the last board', () => {
      var gameState = new GameStateHelper();
      expect(gameState.currentBoard).not.toBeDefined();
   });
});
