declare module redouble {
    interface IBiddingStrategy {
        getBid(game: redouble.IGameState);
    }

    interface ICardplayStrategy {
        getCard(game: redouble.IGameState);
    }
}
