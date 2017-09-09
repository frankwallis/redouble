include Card;

external require : string => unit = "require" [@@bs.val];

require "ui/table/hand.css";

let component = ReasonReact.statelessComponent "HandComponent";

let make ::cards ::playCard _children => {
  ...component,
  render: fun _self => {
    let childCards = cards |>
      List.map (
        fun card =>
          <li
            className="hand-card hand-card-button"
            key=(Card.name card)
            onClick=(fun _ => playCard card)>
            <CardComponent card />
          </li>
      );
    <div className="hand-container">
      <ol className="container"> (ReasonReact.arrayToElement (Array.of_list childCards)) </ol>
    </div>
  }
};