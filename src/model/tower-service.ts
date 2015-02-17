/// <reference path="../_references.d.ts" />

import Computer from './players/computer';
import Human from './players/human';

export class GameService implements tower.ITowerService {

		public static inject = [];

    constructor() {

    }

    createGame(options): tower.IGame {
    	return this.rubberFactory();
    }

    createComputer(name: string): tower.IPlayer {
        return this.$injector.instantiate(Computer, { "name": name });
    }

    createHuman(name: string): tower.IPlayer {
        return this.$injector.instantiate(Human, { "name": name });
    }
}

export = GameService;
