
import {Seat} from "../core/seat";
import {Bid, BidType, BidSuit} from "../core/bid";
import {Card, Pip, Suit} from "../core/card";
import {GameStateHelper} from "./game-state";

/**
 * Tests if the bid is a valid one in game state and returns an error if not
 */
export function validateBid(bid: tower.IBid, game: GameStateHelper) {
   if (game.biddingHasEnded)
      return new Error("The bidding has already ended");

   switch(bid.type) {
      case BidType.NoBid:
         return;

      case BidType.Double:
         if (!game.lastAction || (game.lastAction.type != BidType.Call))
            return new Error("Invalid double");
         else if (Seat.isPartner(game.lastCaller, game.nextPlayer))
            return new Error("You cannot double your partner!");
         else
            return;

      case BidType.Redouble:
         if (!game.lastAction || (game.lastAction.type != BidType.Double))
            return new Error("Invalid redouble");
         else if (Seat.isPartner(game.lastActor, game.nextPlayer))
            return new Error("You cannot redouble your partner's double");
         else
            return;

      case BidType.Call: {
         if ((!bid.level) || (!bid.suit))
            return new Error("You must say the level and the suit");
         else if ((bid.level < 1) || (bid.level > 7))
            return new Error("Invalid bid level");
         else if (game.lastCall) {
            if (Bid.compare(bid, game.lastCall) <= 0)
               return new Error("Bid must be higher than " + Bid.stringify(game.lastCall));
         }
         return;
      }
   }
}

/**
 * Tests if the card is a valid one given the current game state and returns an error if not
 */
export function validateCard(playedCard: tower.ICard, game: GameStateHelper) {
   if (!game.biddingHasEnded)
      return new Error("The bidding has not ended yet");

   if (!game.currentBoard.hands[game.nextPlayer].some((card) => Card.equals(playedCard, card)))
      return new Error("That is not your card to play");
      
   if (game.hasBeenPlayed(playedCard))
     return new Error("That card has already been played");

   let trick = game.currentTrick;
   
   if ((trick.length > 0) && (trick.length < 4)) {
      let lead = trick[0].card;
    
      if (playedCard.suit != lead.suit) {
         var available = game.currentBoard.hands[game.nextPlayer].filter((card) => {
            return !game.hasBeenPlayed(card) && (card.suit == lead.suit);
         });
         
         if (available.length > 0)
            return new Error("You must follow suit when you can");
      }
   } 
}