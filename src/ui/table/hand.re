include Card;

external require : string => unit = "require" [@@bs.val];

require "ui/table/hand.css";

module Hand = {
  include ReactRe.Component;
  let name = "Hand";
  type props = {cards: list Card.t, playCard: Card.t => unit};
  let render {props} => {
    let cards =
      props.cards |>
      List.map (
        fun card =>
          <li
            className="hand-card hand-card-button"
            key=(Card.name card)
            onClick=(fun _ => props.playCard card)>
            <CardComponent card />
          </li>
      );
    <div className="hand-container">
      <ol className="container"> (ReactRe.listToElement cards) </ol>
    </div>
  };
};

include ReactRe.CreateComponent Hand;

let createElement ::cards ::playCard => wrapProps {cards, playCard};
