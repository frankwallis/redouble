NodeUtils.require("./BidComponent.css");

[@react.component]
let make = (~bid) => {
  switch bid {
  | Bid.Call(level, suit) =>
    <div className="bid-container">
      <span className="bid-level"> (ReasonReact.string(string_of_int(level))) </span>
      <span className=("bid-suit suit-" ++ Bid.BidSuit.name(suit)) />
    </div>
  | _ =>
    <div className="bid-container"> (ReasonReact.string(Bid.description(bid))) </div>
  }
};
