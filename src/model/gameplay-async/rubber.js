/// <reference path="../../_references.d.ts" />

import {rotate} from "./utils.js"
import {Board} from "./board.js";

//implements tower.IGame
export class Rubber {

    static get $inject() { return [ "$q", "$timeout", "$log", "deck" ] };

    constructor($q: ng.IQService,
                $timeout: ng.ITimeoutService,
                $log: ng.ILogService,
                deck) {
    	this.$q = $q;
    	this.$timeout = $timeout;
    	this.$log = $log;
    	this.boards = [];
    	this.deck = deck;
    	console.log('creating');

    }

    async play(players: Array<tower.IPlayer>) {
      this.$log.debug('playing new rubber');

		  this.players = players;
    	var dealer = this.cut();

    	while(!this.playHasEnded()) {
    		var board = new Board(this.$q, this.$timeout, this.$log, this.deck);
    		this.boards.push(board);
    		await this.$q.when(board.play(players, dealer));
    		dealer = rotate(dealer);
    	}
	}

	get north(): tower.IPlayer {
		return this.players[0];//tower.Seat.North];
	}

	get east(): tower.IPlayer {
		return this.players[1];//tower.Seat.East];
	}

	get south(): tower.IPlayer {
		return this.players[2];//tower.Seat.South];
	}

	get west(): tower.IPlayer {
		return this.players[3];//tower.Seat.West];
	}


	// TODO
	cut(): any {
		return 0;
	}

	playHasEnded(): boolean {
		return false;
	}

	getRubberScore(): any {
		return undefined;
	}

	get memo() {
		return { "boardIndex": this.currentBoardIndex, "board": this.currentBoard.memo };
	}

	// public set memo(value: any) {
	// 	this.currentBoardIndex = Math.min(value.boardIndex, this.boards.length -1);
	// 	this.currentBoard.memo = value.board;
	// }

	// private currentBoardIndex: number = 0;

	get currentBoard(): tower.IBoard {
		return this.boards[this.boards.length -1];
	}

	boards: Array<tower.IBoard>;
}

export var rubberFactory = [ "$injector", ($injector) => {
    return () => $injector.instantiate(Rubber);
}];
