open Board;

external require : string => unit = "require" [@@bs.val];
require ("./biddingHistory.css");

let component = ReasonReact.statelessComponent "BiddingHistory";

let make ::board _children => {
  let rec range i j => if (i >= j) [] else [i, ...(range (i+1) j)];

  let renderHeading seat => <th key=(Seat.name seat) className="bidding-cell">(ReasonReact.stringToElement(Seat.name seat))</th>;

  let renderRow bids rowIdx => {
    let cells = bids
      |> List.mapi (fun idx bid => <td key=(string_of_int idx) className="bidding-cell"> <BidComponent bid=bid/> </td>);
    let emptyCells = (range (List.length bids) 4)
      |> List.mapi (fun _ idx => <td key=(string_of_int idx) className="bidding-cell"> </td>);

    <tr key=(string_of_int rowIdx) className="bidding-round">(ReasonReact.arrayToElement (Array.of_list (cells @ emptyCells)))</tr>
  };

  let rec renderRows bids rowIdx =>
    switch bids {
    | [] => []
    | [bid1, bid2, bid3, bid4, ...restBids] => [renderRow [bid1, bid2, bid3, bid4] rowIdx, ...(renderRows restBids (rowIdx+1))]
    | _ => [renderRow bids rowIdx]
    };

  let headings = List.map renderHeading (List.map (fun idx => (Seat.rotateN board.dealer idx)) (range 0 4));
  let rows = renderRows (List.rev board.bids) 0;
  {
    ...component,
    render: fun _self => {
      <table className="bidding-container pure-table">
        <thead>
          <tr>(ReasonReact.arrayToElement(Array.of_list headings))</tr>
        </thead>
        <tbody>
          (ReasonReact.arrayToElement(Array.of_list rows))
        </tbody>
      </table>
    }
  }
};