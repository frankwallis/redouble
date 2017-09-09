include Card;

external require : string => unit = "require" [@@bs.val];

require "ui/components/cardComponent.css";

let component = ReasonReact.statelessComponent "CardComponent";

let make ::card _children => {
  ...component,
  render: fun _self => {
    let (pip, suit) = card;
    <div className="card-container">
      <div className="card-edge-left">
        <div className="card-pip-small"> (ReasonReact.stringToElement (Pip.name pip)) </div>
        <div className=("card-suit suit-" ^ Suit.name suit) />
      </div>
      <div className="card-pip"> (ReasonReact.stringToElement (Pip.name pip)) </div>
      <div className="card-edge-right">
        <div className="card-pip-small"> (ReasonReact.stringToElement (Pip.name pip)) </div>
        <div className=("card-suit suit-" ^ Suit.name suit) />
      </div>
    </div>
  }
}