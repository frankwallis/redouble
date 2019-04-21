NodeUtils.require("./CardComponent.css");

[@react.component]
let make = (~card) => {
  let (pip, suit) = card;
  <div className="card-container">
    <div className="card-edge-left">
      <div className="card-pip-small"> (ReasonReact.string(Card.Pip.name(pip))) </div>
      <div className=("card-suit suit-" ++ Card.Suit.name(suit)) />
    </div>
    <div className="card-pip"> (ReasonReact.string(Card.Pip.name(pip))) </div>
    <div className="card-edge-right">
      <div className="card-pip-small"> (ReasonReact.string(Card.Pip.name(pip))) </div>
      <div className=("card-suit suit-" ++ Card.Suit.name(suit)) />
    </div>
  </div>
};
