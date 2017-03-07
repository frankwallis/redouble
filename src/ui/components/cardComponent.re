include Card;

external require : string => unit = "require" [@@bs.val];

require "ui/components/cardComponent.css";

module CardComponent = {
  include ReactRe.Component;
  let name = "CardComponent";
  type props = Card.t;
  let render {props} => {
    let (pip, suit) = props;
    <div className="card-container">
      <div className="card-edge-left">
        <div className="card-pip-small"> (ReactRe.stringToElement (Pip.name pip)) </div>
        <div className=("card-suit suit-" ^ Suit.name suit) />
      </div>
      <div className="card-pip"> (ReactRe.stringToElement (Pip.name pip)) </div>
      <div className="card-edge-right">
        <div className="card-pip-small"> (ReactRe.stringToElement (Pip.name pip)) </div>
        <div className=("card-suit suit-" ^ Suit.name suit) />
      </div>
    </div>
  };
};

include ReactRe.CreateComponent CardComponent;

let createElement ::card => wrapProps card;
