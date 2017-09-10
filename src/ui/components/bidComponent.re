external require : string => unit = "require" [@@bs.val];
require "./bidComponent.css";

let component = ReasonReact.statelessComponent "BidComponent";

let make ::bid _children => {
  ...component,
  render: fun _self => {
    switch bid {
    | Bid.Call level suit =>
      <div className="bid-container">
        <span className="bid-level"> (ReasonReact.stringToElement (string_of_int level)) </span>
        <span className=("bid-suit suit-" ^ Bid.BidSuit.name suit) />
      </div>
    | _ => <div className="bid-container"> (ReasonReact.stringToElement (Bid.description bid)) </div>
    };
  }
}