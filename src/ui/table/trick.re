NodeUtils.require("ui/table/trick.css");

let component = ReasonReact.statelessComponent("Trick");

let make = (~board, _children) => {
  ...component,
  render: (_self) => {
    let cardItems =
      Card.SeatMap.bindings(Board.currentTrickMap(board))
      |> List.map(
           ((seat, cardOpt)) =>
             <li key=(Seat.name(seat)) className=("trick-card-" ++ Seat.name(seat))>
               (
                 switch cardOpt {
                 | Some(card) => <CardComponent card />
                 | None => ReasonReact.null
                 }
               )
             </li>
         );
    <ol className="trick-container"> (ReasonReact.array(Array.of_list(cardItems))) </ol>
  }
};
