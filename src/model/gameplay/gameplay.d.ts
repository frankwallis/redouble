declare module tower {
	const enum BidSuit {
		Clubs = 1, Diamonds = 2, Hearts = 3, Spades = 4, NoTrumps = 5
	}

	const enum Seat {
		North = 0, East = 1, South = 2, West = 3
	}

	interface IPlayer {
		bid(game: tower.IGame): ng.IPromise<any>;
		play(game: tower.IGame): ng.IPromise<any>;
        seat: Seat;
        name: string;
        game: IGame;
        hand: IHand;
        setCards(cards: Array<ICard>): IPlayer;
	}

	interface IGameSequence {
		setPlayers(players: Array<IPlayer>);
		play(initialPlayer: IPlayer): ng.IPromise<any>;
        playHasEnded(): boolean;
	}
    
    interface IMemorable {
        memo: any;       
    }

    const enum BidType {
        NoBid = 0, Call = 1, Double = 2, Redouble = 3
    }
    
	interface IBid {
        type: BidType;
		suit?: BidSuit;
		level?: number;
	}

    interface IBidding extends IGameSequence {
        northBid: IBid;
		eastBid: IBid;
		southBid: IBid;
		westBid: IBid;
        
        lastBid: IBid;
        bids: Array<IBid>;
        currentPlayer: IPlayer;
	}

    interface ITrick extends IGameSequence {
		northCard: ICard;
		eastCard: ICard;
		southCard: ICard;
		westCard: ICard;
		leadCard: ICard;
        
		cards: Array<ICard>;
        leader: IPlayer;
        currentPlayer: IPlayer;
        winner: IPlayer;
	}

    interface ICardplay extends IGameSequence {
		tricks: Array<ITrick>;
        currentTrick: ITrick;
	}

	interface IBoard extends IGameSequence, IMemorable {
		bidding: IBidding;
		cardplay: ICardplay;
	}

	interface IGame extends IGameSequence, IMemorable {
		currentBoard: IBoard;
	}
    
}