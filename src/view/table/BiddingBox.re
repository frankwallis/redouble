NodeUtils.require("./BiddingBox.css");

module BidButton = {
  [@react.component]
  let make = (~bid, ~makeBid) => {
    let className = "bidding-box-button pure-button bid-" ++ Bid.name(bid);
    <button className onClick=((_) => makeBid(bid))>
      <BidComponent bid />
    </button>
  };
};

[@react.component]
let make = (~makeBid) => {
  /* buid a 2d array containing all the bids in their rows */
  let callRows =
    [1, 2, 3, 4, 5, 6, 7]
    |> List.map((level) => Bid.BidSuit.all |> List.map((suit) => Bid.Call(level, suit)));
  let bidRows = callRows @ [[Double, Redouble, NoBid]];
  /* convert them into buttons */
  let buttonRows = bidRows |> List.map((bidRow) => List.map(bid => <BidButton key=(Bid.name(bid)) bid makeBid />, bidRow));
  /* and wrap each row in a div */
  let rows =
    buttonRows
    |> List.mapi(
         (idx, buttonRow) =>
           <div key=(string_of_int(idx)) className="bidding-box-row">
             (ReasonReact.array(Array.of_list(buttonRow)))
           </div>
       );
  /* return them all */
  <div className="bidding-box-container">
    (ReasonReact.array(Array.of_list(rows)))
  </div>
};
