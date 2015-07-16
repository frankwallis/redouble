import "operative";


function getBaseUrl() {
	let bases = document.getElementsByTagName('base');
	return bases.length > 0 ? bases[0].href : undefined;
}

export class CardplayStrategyProxy {
	constructor() {
		let imports = [];
		
		let baseURL = getBaseUrl();

		if (baseURL)
			operative.setBaseURL(baseURL);

		if (System.towerOptions && System.towerOptions.bundle) {
			imports = ["jspm_packages/system.js", System.towerOptions.bundle, "src/stores/strategy-worker.js"];
		}
		else {
			imports = ["jspm_packages/system.js", "config.js", "src/stores/strategy-worker.js"];						
		}
		
		this._operative = operative({
			getCard: function(cb) {
				instance
					.then((strategy) => {
						return strategy.getCard();
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
	
	getCard() {
		return this._operative.getCard();
	}
	
	updateGameState(game: Game) {
		return this._operative.updateGameState(game.gameState);
	}
}