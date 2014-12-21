declare module tower {
	enum BidSuit {
		Spades = 0, Hearts = 2, Diamonds = 3, Clubs = 4, NoTrumps = 5
	}

	enum Seat {
		North = 0, East = 1, South = 2, West = 3
	}

	interface IPlayer {
		bid(): ng.IPromise<any>;
		play(trick: ITrick): ng.IPromise<any>;
        seat: Seat;
        name: string;
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

    enum BidType {
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