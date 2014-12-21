declare module tower {
 	interface IHand {
        availableCards: Array<tower.ICard>;
        playedCards: Array<tower.ICard>;
        
        play(card: tower.ICard);
	}    
}