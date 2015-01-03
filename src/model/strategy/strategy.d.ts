declare module tower {
    interface IBiddingStrategy {
        getBid(game: tower.IGame);    
    }
    
    interface ICardplayStrategy {
        getCard(game: tower.IGame);    
    }
}