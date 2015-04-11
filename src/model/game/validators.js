
import {Seat} from "../core/seat";
import {Bid, BidType, BidSuit} from "../core/bid";
import {Card, Pip, Suit} from "../core/card";
import {GameStateHelper} from "./game-state";

/**
 * Tests if the bid is a valid one in game state and returns an error if not
 */
export function validateBid(bid: tower.IBid, game: GameStateHelper) {
   if (game.biddingHasEnded)
      return new Error("the bidding has already ended");

   switch(bid.type) {
      case BidType.NoBid:
         return;

      case BidType.Double:
         if (!game.lastAction || (game.lastAction.type != BidType.Call))
            return new Error("invalid double");
         else if (Seat.isPartner(game.lastCaller, game.nextPlayer))
            return new Error("you cannot double your partner!");
         else
            return;

      case BidType.Redouble:
         if (!game.lastAction || (game.lastAction.type != BidType.Double))
            return new Error("invalid redouble");
         else if (Seat.isPartner(game.lastActor, game.nextPlayer))
            return new Error("you cannot redouble your partner");
         else
            return;

      case BidType.Call: {
         if ((!bid.level) || (!bid.suit))
            return new Error("you must say the level and the suit");
         else if ((bid.level < 1) || (bid.level > 7))
            return new Error("invalid bid level");
         else if (game.lastCall) {
            if (Bid.compare(bid, game.lastCall) <= 0)
               return new Error("bid must be higher than " + Bid.stringify(game.lastCall));
         }
         return;
      }
   }
}

/**
 * Tests if the card is a valid one in game state and returns an error if not
 */
export function validateCard(card: tower.ICard, game: GameStateHelper) {

}
