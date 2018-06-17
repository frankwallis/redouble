NodeUtils.require("./trickScore.css");

let component = ReasonReact.statelessComponent("TrickScore");

let make = (~board, _children) => {
  let renderContract = () =>
    switch (Board.contract(board)) {
    | Some(bid) => <BidComponent bid />
    | None => ReasonReact.null
    };
  {
    ...component,
    render: (_self) =>
      <div className="trick-score-container">
        <div className="trick-score-row">
          <span className="trick-score-row-header">
            ("Contract:" |> ReasonReact.string)
          </span>
          <span className="trick-score-row-content"> (renderContract()) </span>
        </div>
        <div className="trick-score-row">
          <span className="trick-score-row-header">
            ("Tricks:" |> ReasonReact.string)
          </span>
          <span className="trick-score-row-content">
            <span>
              (Board.declarerTricks(board) |> string_of_int |> ReasonReact.string)
            </span>
            <span> ("/" |> ReasonReact.string) </span>
            <span>
              (
                Board.completedTricks(board)
                |> List.length
                |> string_of_int
                |> ReasonReact.string
              )
            </span>
          </span>
        </div>
      </div>
  }
};
