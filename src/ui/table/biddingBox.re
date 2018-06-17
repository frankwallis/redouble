NodeUtils.require("./biddingBox.css");

let component = ReasonReact.statelessComponent("BiddingBox");

let make = (~makeBid, _children) => {
  let renderButton = (bid) => {
    let className = "bidding-box-button pure-button bid-" ++ Bid.name(bid);
    <button className key=(Bid.name(bid)) onClick=((_) => makeBid(bid))>
      <BidComponent bid />
    </button>
  };
  /* buid a 2d array containing all the bids in their rows */
  let callRows =
    [1, 2, 3, 4, 5, 6, 7]
    |> List.map((level) => Bid.BidSuit.all |> List.map((suit) => Bid.Call(level, suit)));
  let bidRows = callRows @ [[Double, Redouble, NoBid]];
  /* convert them into buttons */
  let buttonRows = bidRows |> List.map((bidRow) => List.map(renderButton, bidRow));
  /* and wrap each row in a div */
  let rows =
    buttonRows
    |> List.mapi(
         (idx, buttonRow) =>
           <div key=(string_of_int(idx)) className="bidding-box-row">
             (ReasonReact.array(Array.of_list(buttonRow)))
           </div>
       );
  {
    ...component,
    render: (_self) =>
      <div className="bidding-box-container">
        (ReasonReact.array(Array.of_list(rows)))
      </div>
  }
};
