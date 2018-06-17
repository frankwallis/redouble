open Board;

NodeUtils.require("./biddingHistory.css");

let component = ReasonReact.statelessComponent("BiddingHistory");

let make = (~board, _children) => {
  let rec range = (i, j) =>
    if (i >= j) {
      []
    } else {
      [i, ...range(i + 1, j)]
    };
  let renderHeading = (seat) =>
    <th key=(Seat.name(seat)) className="bidding-cell">
      (ReasonReact.string(Seat.name(seat)))
    </th>;
  let renderRow = (bids, rowIdx) => {
    let cells =
      bids
      |> List.mapi(
           (idx, bid) =>
             <td key=(string_of_int(idx)) className="bidding-cell"> <BidComponent bid /> </td>
         );
    let emptyCells =
      range(List.length(bids), 4)
      |> List.mapi((_, idx) => <td key=(string_of_int(idx)) className="bidding-cell" />);
    <tr key=(string_of_int(rowIdx)) className="bidding-round">
      (ReasonReact.array(Array.of_list(cells @ emptyCells)))
    </tr>
  };
  let rec renderRows = (bids, rowIdx) =>
    switch bids {
    | [] => [renderRow([], rowIdx)]
    | [bid1, bid2, bid3, bid4, ...restBids] => [
        renderRow([bid1, bid2, bid3, bid4], rowIdx),
        ...renderRows(restBids, rowIdx + 1)
      ]
    | _ => [renderRow(bids, rowIdx)]
    };
  let headings =
    List.map(renderHeading, List.map((idx) => Seat.rotateN(board.dealer, idx), range(0, 4)));
  let rows = renderRows(List.rev(board.bids), 0);
  {
    ...component,
    render: (_self) =>
      <table className="bidding-container pure-table">
        <thead> <tr> (ReasonReact.array(Array.of_list(headings))) </tr> </thead>
        <tbody> (ReasonReact.array(Array.of_list(rows))) </tbody>
      </table>
  }
};
