NodeUtils.require("./trickScore.css");

let component = ReasonReact.statelessComponent("TrickScore");

module Contract = {
  [@react.component]
  let make = (~board) => {
    switch (Board.contract(board)) {
    | Some(bid) => <BidComponent bid />
    | None => ReasonReact.null
    };
  }
};

[@react.component]
let make = (~board) => {
  <div className="trick-score-container">
    <div className="trick-score-row">
      <span className="trick-score-row-header">
        ("Contract:" |> ReasonReact.string)
      </span>
      <span className="trick-score-row-content"> <Contract board /> </span>
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
};
