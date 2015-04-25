/* @flow */

export class CardplayStrategy {

   constructor() {

   }

   getCard(game): tower.ICard {
      let trick = game.currentTrick;
      let cards = game.currentBoard.hands[game.nextPlayer].filter((card) => !game.hasBeenPlayed(card));
      return this.getAnyCard(trick[0], cards);
   }

   getAnyCard(lead: tower.ICard, cards: tower.IHand) {
      let availableCards = cards;

      if (lead) {
         let followers = availableCards.filter((card) => card.suit == lead.card.suit);

         if (followers.length > 0)
            availableCards = followers;
      }

      return availableCards[0];
   }
}
