declare module tower {
	interface ITowerService {
		createGame(): IGame;
        createComputer(name: string): IPlayer;
        createHuman(name: string): IPlayer;
	}
}