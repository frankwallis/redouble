NodeUtils.require "ui/table/trick.css";

let component = ReasonReact.statelessComponent "Trick";

let make ::board _children => {
  {
    ...component,
    render: fun _self => {
      let cardItems = Card.SeatMap.bindings (Board.currentTrickMap board)
        |> List.map (fun (seat, cardOpt) => {
          <li key=(Seat.name seat) className=("trick-card-" ^ (Seat.name seat))>
            (switch cardOpt {
            | Some card => <CardComponent card />
            | None => ReasonReact.nullElement
            })
          </li>
        });

      <ol className="trick-container">
        (ReasonReact.arrayToElement (Array.of_list cardItems))
      </ol>
    }
  }
};