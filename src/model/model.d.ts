declare module tower {
	interface ITowerService {
		createGame(): IGame;
        createComputer(name: string): IPlayer;
	}
}