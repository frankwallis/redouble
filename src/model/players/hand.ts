/// <reference path="../../_references.d.ts" />

class Hand implements tower.IHand {

    constructor(cards: Array<tower.ICard>) {
        this.availableCards = cards.sort((c1, c2) => (c2.suit - c1.suit) || (c2.pip - c1.pip));
        this.playedCards = [];
    }
    
    public availableCards: Array<tower.ICard>;
    public playedCards: Array<tower.ICard>;
    
    public evaluate(): number {
        return 11;
    }
    
    public play(card: tower.ICard) {
        if (this.availableCards.indexOf(card) < 0)
            throw new Error("card is not available");
        
        this.availableCards = this.availableCards
            .filter((avail) => (avail !== card));
        
        this.playedCards.push(card);
    }
}

export = Hand;