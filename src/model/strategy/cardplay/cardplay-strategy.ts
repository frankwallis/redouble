/// <reference path="../../../_references.d.ts" />

export class CardplayStrategy { //implements tower.ICardplayStrategy {

    constructor() {

    }

    getCard(game: tower.IGame, player: tower.IPlayer): tower.ICard {
        var trick = game.currentBoard.cardplay.currentTrick;
        return this.getAnyCard(trick.leadCard, player.hand);
    }

    getAnyCard(lead: tower.ICard, hand: tower.IHand) {

        if (lead) {
            for (var i = 0; i < hand.availableCards.length; i ++)
                if (hand.availableCards[i].suit == lead.suit)
                    return hand.availableCards[i];
        }

        return hand.availableCards[0];
    }
}
