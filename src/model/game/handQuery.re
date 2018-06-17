open Card;

let holder = (card, hands) => {
  let holders = SeatMap.bindings(SeatMap.filter((_key, hand) => List.mem(card, hand), hands));
  switch holders {
  | [(seat, _)] => seat
  | [] => raise(Not_found)
  | _ => raise(Invalid_argument("card was present in more than one hand!"))
  }
};

let getHoldings = (hand) => {
  let emptyHoldings =
    Suit.all |> List.fold_left((result, suit) => SuitMap.add(suit, [], result), SuitMap.empty);
  hand
  |> List.fold_left(
       (result, (pip, suit)) => {
         let holding = SuitMap.find(suit, result);
         SuitMap.add(suit, [(pip, suit), ...holding], result)
       },
       emptyHoldings
     )
};

/*
  TODO - this should probably be moved into an 'evaluation strategy' which
  takes into account current bidding and 'fit' etc
 */
let getHighCardPoints = (holding) =>
  holding
  |> List.fold_left(
       (result, card) =>
         switch card {
         | (Pip.Ace, _) => result + 4
         | (Pip.King, _) => result + 3
         | (Pip.Queen, _) => result + 2
         | (Pip.Jack, _) => result + 1
         | (_, _) => result
         },
       0
     );

let getDistributionPoints = (holding) =>
  switch holding {
  | [] => 3
  | [_] => 2
  | [_, _] => 1
  | _ => 0
  };

let getPointCount = (hand) => {
  let holdings = getHoldings(hand);
  SuitMap.bindings(holdings)
  |> List.fold_left(
       (result, (_suit, holding)) =>
         result + getHighCardPoints(holding) + getDistributionPoints(holding),
       0
     )
};
