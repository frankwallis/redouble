import "operative";

export class CardplayStrategyProxy {
	constructor() {
		operative.setBaseURL(System.baseURL);
		
		this._operative = operative({
			getCard: function(gameState, cb) {
				instance
					.then((strategy) => {
						return strategy.getCard(gameState);
					})
					.then((card) => {
						cb(card);
					})
			},
			updateGameState: function(gameState, cb) {
				instance
					.then((strategy) => {
						strategy.updateGameState(gameState);
						cb();
					})
			}
		}, ["jspm_packages/system.js", "config.js", "src/stores/strategy-worker.js"]);
	}
	
	getCard(game: GameState) {
		return this._operative.getCard(game.gameState);
	}
	
	updateGameState(game: GameState) {
		return this._operative.updateGameState(game.gameState);
	}

}