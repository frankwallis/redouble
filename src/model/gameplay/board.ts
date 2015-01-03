/// <reference path="../../_references.d.ts" />

import GameSequence = require("./game-sequence");

class Board extends GameSequence implements tower.IBoard {

    public static $inject = [ "$q", "$timeout", "$log", "biddingFactory", "cardplayFactory" ];
    
    constructor($q: ng.IQService, 
                $timeout: ng.ITimeoutService,
                $log: ng.ILogService,
                biddingFactory: () => tower.IBidding, 
                cardplayFactory: () => tower.ICardplay) {   
        
        super($q, $timeout, $log);
        
        this.bidding = biddingFactory();
        this.cardplay = cardplayFactory();
    }

    public bidding: tower.IBidding;
    public cardplay: tower.ICardplay; 

    public getNextState(currentPlayer: tower.IPlayer): ng.IPromise<any> {
    	this.bidding.setPlayers(this.players);
    	return this.bidding.play(this.initialPlayer)
    		.then(() => {
                this.cardplay.setPlayers(this.players);
                return this.cardplay.play(this.opener);
            });
    }

    public playHasEnded(): boolean {
        return this.cardplay.playHasEnded();
    }
    
    private get opener(): tower.IPlayer {
    	return this.initialPlayer;//bidding.openingLead;
    }
    
    public get memo() {
		return {};// TODO { "bidding": this.bidding.memo, "cardplay": this.cardplay.memo };
	}

	public set memo(value: any) {
		//this.currentBoardIndex = Math.min(value.boardIndex, this.boards.length -1);
		//this.currentBoard.memo = value.board;
	}

}

var boardFactory = [ "$injector", ($injector) => {    
    return () => $injector.instantiate(Board);
}];

export = boardFactory;