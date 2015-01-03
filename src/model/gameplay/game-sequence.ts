/// <reference path="../../_references.d.ts" />

class GameSequence {

    constructor(public $q: ng.IQService, 
                public $timeout: ng.ITimeoutService,
                public $log: ng.ILogService) { }

    public get north(): tower.IPlayer {
		return this.players[tower.Seat.North];
	}

	public get south(): tower.IPlayer {
		return this.players[tower.Seat.South];
	}

	public get east(): tower.IPlayer {
		return this.players[tower.Seat.East];
	}

	public get west(): tower.IPlayer {
		return this.players[tower.Seat.West];
	}

    public players: Array<tower.IPlayer>;
    
	public setPlayers(players: Array<tower.IPlayer>);
	public setPlayers(north: tower.IPlayer, south: tower.IPlayer, east: tower.IPlayer, west: tower.IPlayer);
	public setPlayers() {
        if (Array.isArray(arguments[0]))
            this.players = arguments[0];
        else
            this.players = Array.prototype.slice.call(arguments);
        
		this.west.seat = tower.Seat.West;
		this.east.seat = tower.Seat.East;
		this.north.seat = tower.Seat.North;
		this.south.seat = tower.Seat.South;
	}

	public currentPlayerIndex = 0;
	public get currentPlayer(): tower.IPlayer {
        return this.players[this.currentPlayerIndex];
    }

	public initialPlayer: tower.IPlayer;

    // TODO - make this an ES6 generator?
	public play(initialPlayer: tower.IPlayer): ng.IPromise<any> {
		var result = this.$q.defer();
        this.initialPlayer = initialPlayer;
        this.currentPlayerIndex = this.players.indexOf(initialPlayer);
        console.log((<any>this.constructor).name + ".play " + "initialPlayer=" + this.currentPlayer.name);
		this.nextTurn(result);
		return result.promise;
	}

	private nextTurn(playResult: ng.IDeferred<any>) {

		playResult.notify(this);
        //console.log((<any>this.constructor).name + ".nextTurn " + "currentPlayer=" + this.currentPlayer.name);

		this.getNextState(this.currentPlayer)
			.then(() => {
				if (this.playHasEnded()) {
                    console.log((<any>this.constructor).name + ".complete " + "currentPlayer=" + this.currentPlayer.name);
					playResult.resolve(this);
				}
				else {
                    this.nextPlayer();
					this.nextTurn(playResult);
				}
			});
	}
    
    private nextPlayer() {
        this.currentPlayerIndex = this.players.indexOf(this.getNextPlayer());
    }
    
    public getNextPlayer(): tower.IPlayer {
        if (this.currentPlayerIndex == tower.Seat.West)
            return this.north;
        else
            return this.players[this.currentPlayerIndex +1]
    }

    public getNextState(currentPlayer: tower.IPlayer): ng.IPromise<any> {
        throw new Error("unimplemented abstract method: getNextState");
        //return { playHasEnded: () => true, currenPlayer: () => undefined };
    }    
    
    public playHasEnded(): boolean {
        throw new Error("unimplemented abstract method: playHasEnded");
        //return { playHasEnded: () => true, currenPlayer: () => undefined };
    }   
    
    public delay(promise: ng.IPromise<any>, interval: number): ng.IPromise<any> {
        var result = this.$q.defer();
        
        promise.then((res) => this.$timeout(() => result.resolve(res), interval),
                     (err) => this.$timeout(() => result.reject(err), interval),
                     (msg) => this.$timeout(() => result.notify(msg), interval));
        
        return result.promise;
    }
}

export = GameSequence;