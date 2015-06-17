import "operative";

export class CardplayStrategyProxy {
	constructor() {
		let imports = [];
				
		if (System.baseURL) {
			operative.setBaseURL(System.baseURL);
			imports = ["jspm_packages/system.js", "config.js", "src/stores/strategy-worker.js"]; 
		}
		else {
			imports = ["jspm_packages/system.js", "config.js", "src/stores/strategy-worker.js"];						
		}
		
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
		}, imports);
	}
	
	getCard(game: GameState) {
		return this._operative.getCard(game.gameState);
	}
	
	updateGameState(game: GameState) {
		return this._operative.updateGameState(game.gameState);
	}

}