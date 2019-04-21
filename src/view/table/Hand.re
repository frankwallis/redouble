NodeUtils.require("./Hand.css");

[@react.component]
let make = (~cards, ~playCard) => {
  let childCards = cards
    |> List.map(
         (card) =>
           <li
             className="hand-card hand-card-button"
             key=(Card.name(card))
             onClick=((_) => playCard(card))>
             <CardComponent card />
           </li>
       );

  <div className="hand-container">
    <ol className="container"> (ReasonReact.array(Array.of_list(childCards))) </ol>
  </div>
};
