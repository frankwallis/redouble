/* @flow */

export class CardplayStrategy {

   constructor() {

   }

   getCard(game): tower.ICard {
      var trick = game.currentTrick;
      var cards = game.hands[game.nextPlayer].filter((card) => !game.hasBeenPlayed(card));
      return this.getAnyCard(trick[0], cards);
   }

   getAnyCard(lead: tower.ICard, cards: tower.IHand) {
      var availableCards = cards;

      if (lead) {
         var followers = availableCards.filter((card) => card.suit == lead.suit);

         if (followers.length > 0)
            availableCards = followers;
      }

      return hand.availableCards[0];
   }
}
