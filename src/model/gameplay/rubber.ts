/// <reference path="../../_references.d.ts" />

import GameSequence = require("./game-sequence");
import Deck = require("../cards/deck");

class Rubber extends GameSequence implements tower.IGame {

    public static $inject = [ "$q", "$timeout", "$log", "boardFactory" ];

    constructor($q: ng.IQService,
                $timeout: ng.ITimeoutService,
                $log: ng.ILogService,
                private boardFactory: () => tower.IBoard) {
         super($q, $timeout, $log);
    }

	public getNextState(player: tower.IPlayer): ng.IPromise<any> {

        // TODO !!
        this.players.forEach((player) => {
            player.game = this;
        });

        var deck = new Deck();
        deck.shuffle();
        var hands = deck.deal(4);
        for(var i = 0; i < hands.length; i++) {
            console.log(JSON.stringify(hands[i]));
            this.players[i].setCards(hands[i]);
        }

		var board = this.boardFactory();
		board.setPlayers(this.players);
		this.boards.push(board);

		return board.play(this.currentPlayer)
	}

	public playHasEnded(): boolean {
		return true;
	}

	private getRubberScore(): any {
		return undefined;
	}

	public get memo() {
		return { "boardIndex": this.currentBoardIndex, "board": this.currentBoard.memo };
	}

	public set memo(value: any) {
		this.currentBoardIndex = Math.min(value.boardIndex, this.boards.length -1);
		this.currentBoard.memo = value.board;
	}

	private currentBoardIndex: number = 0;

	public get currentBoard(): tower.IBoard {
		return this.boards[this.currentBoardIndex];
	}

	public boards: Array<tower.IBoard> = [];
}

var rubberFactory = [ "$injector", ($injector) => {
    return () => $injector.instantiate(Rubber);
}];

export = rubberFactory;
