declare module tower {
    interface IBiddingStrategy {
        getBid(game: tower.IGameState);    
    }
    
    interface ICardplayStrategy {
        getCard(game: tower.IGameState);    
    }
}