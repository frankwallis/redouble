open Card;

let getHoldings hand => {
  let emptyHoldings = Suit.all |> List.fold_left (fun result suit => {
    SuitMap.add suit [] result
  }) SuitMap.empty;

  hand |> List.fold_left (fun result (pip, suit) => {
    let holding = SuitMap.find suit result;
    SuitMap.add suit [(pip, suit), ...holding] result;
  }) emptyHoldings;
};

/*
  TODO - this should probably be moved into an 'evaluation strategy' which
  takes into account current bidding and 'fit' etc
 */

let getHighCardPoints holding => {
  holding |> List.fold_left (fun result card => {
    switch card {
    | (Pip.Ace, _) => result + 4
    | (Pip.King, _) => result + 3
    | (Pip.Queen, _) => result + 2
    | (Pip.Jack, _) => result + 1
    | (_, _) => result
    }
  }) 0;
};

let getDistributionPoints holding => {
  switch holding {
  | [] => 3
  | [_] => 2
  | [_, _] => 1
  | _ => 0
  }
};

let getPointCount hand => {
  let holdings = getHoldings hand;

  (SuitMap.bindings holdings) |> List.fold_left (fun result (suit, holding) => {
    result + (getHighCardPoints holding) + (getDistributionPoints holding)
  }) 0;
};
