open Bid;
open BoardType;

let getBid _board => {
  Js.log "Bidding";
  Js.Promise.resolve NoBid;
}