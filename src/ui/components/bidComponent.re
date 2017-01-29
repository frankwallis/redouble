include Bid;

external require : string => unit = "require" [@@bs.val];
require ("ui/components/bidComponent.css");

module BidComponent = {
  include ReactRe.Component;
  let name = "BidComponent";
  type props = Bid.t;

  let render {props} => {
		switch props {
      | Bid.Call level suit =>
          <div className="bid-container">
            <span className="bid-level">(ReactRe.stringToElement (string_of_int level))</span>
            <span className=("bid-suit suit-" ^ (BidSuit.name suit))> </span>
          </div>
      | _ => <div className="bid-container">(ReactRe.stringToElement(Bid.name props))</div>;
    };
  };
};

include ReactRe.CreateComponent BidComponent;
let createElement ::bid => wrapProps {bid};
