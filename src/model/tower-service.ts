/// <reference path="../_references.d.ts" />

import Computer = require('./players/computer');
import Human = require('./players/human');

class GameService implements tower.ITowerService {

	public static $inject = [ "$injector", "rubberFactory" ];

    constructor(private $injector: ng.auto.IInjectorService,
                private rubberFactory: () => tower.IGame) {   
         
    }

    createGame(): tower.IGame {
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