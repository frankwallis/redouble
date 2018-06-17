NodeUtils.require("ui/table/hand.css");

let component = ReasonReact.statelessComponent("Hand");

let make = (~cards, ~playCard, _children) => {
  let childCards =
    cards
    |> List.map(
         (card) =>
           <li
             className="hand-card hand-card-button"
             key=(Card.name(card))
             onClick=((_) => playCard(card))>
             <CardComponent card />
           </li>
       );
  {
    ...component,
    render: (_self) =>
      <div className="hand-container">
        <ol className="container"> (ReasonReact.array(Array.of_list(childCards))) </ol>
      </div>
  }
};
