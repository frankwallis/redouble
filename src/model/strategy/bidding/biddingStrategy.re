open Bid;
open BoardType;

let getBid board => {
  Js.log "Bidding";
  Js.log board.dealer;
  Js.Promise.resolve NoBid;
}