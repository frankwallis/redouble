/// <reference path="../../_references.d.ts" />

export class Hand { //implements tower.IHand {

    constructor(cards: any/*Array<tower.ICard>*/) {
      console.log('creating hand');
        this.availableCards = cards.sort((c1, c2) => (c2.suit - c1.suit) || (c2.pip - c1.pip));
        this.playedCards = [];
    }

    availableCards: Array<tower.ICard>;
    playedCards: Array<tower.ICard>;

    evaluate(): number {
        return 11;
    }

    play(card: tower.ICard) {
        if (this.availableCards.indexOf(card) < 0)
            throw new Error("card is not available");

        this.availableCards = this.availableCards
            .filter((avail) => (avail !== card));

        this.playedCards.push(card);
    }
}
