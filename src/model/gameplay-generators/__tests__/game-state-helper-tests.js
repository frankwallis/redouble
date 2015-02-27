jest.dontMock('../game-state-helper.js');

import {GameStateHelper} from '../game-state-helper';

describe('currentBoard', () => {
  it('returns the last board', () => {
    var gameState = new GameStateHelper();
    expect(gameState.currentBoard).not.toBeDefined();
  });
});
