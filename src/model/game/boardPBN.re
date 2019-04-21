open BoardType;

open Card;

let handFromPBN = (pbn) => {
  let holdings = List.combine(Suit.all, Utils.split_on_char('.', pbn));
  holdings
  |> List.fold_left(
       (result, (suit, holding)) =>
         result @ (Utils.to_list(holding) |> List.map((pip) => (Pip.fromPBN(pip), suit))),
       []
     )
};

let handToPBN = (hand) => {
  let holdings = HandQuery.getHoldings(hand);
  Suit.all
  |> List.map(
       (suit) =>
         SuitMap.find(suit, holdings)
         |> List.map(((pip, _suit)) => Pip.toPBN(pip))
         |> List.rev
         |> String.concat("")
     )
  |> String.concat(".")
};

let fromPBN = (pbn) => {
  let parts = List.map(String.trim, Utils.split_on_char(':', pbn));
  switch parts {
  | [pbn_dealer, pbn_deck] =>
    let dealer = Seat.fromPBN(pbn_dealer);
    let pbn_hands = Utils.split_on_char(' ', String.trim(pbn_deck));
    switch pbn_hands {
    | [_, _, _, _] =>
      let hand_pairs =
        pbn_hands
        |> List.mapi((idx, pbn_hand) => (Seat.rotateN(dealer, idx), handFromPBN(pbn_hand)));
      let hands =
        hand_pairs
        |> List.fold_left((result, (seat, hand)) => SeatMap.add(seat, hand, result), SeatMap.empty);
      {dealer, hands, bids: [], cards: []}
    | _ => raise(Invalid_argument("Invalid PBN string"))
    }
  | _ => raise(Invalid_argument("Invalid PBN string"))
  }
};

let toPBN = (board) => {
  let prefix = Seat.toPBN(board.dealer) ++ ":";
  let remaining = CardplayQuery.remainingHands(board);
  Utils.range(4)
  |> List.fold_left(
       (result, idx) => {
         let seat = Seat.rotateN(board.dealer, idx);
         let cards = SeatMap.find(seat, remaining);
         result ++ (handToPBN(cards) ++ " ")
       },
       prefix
     )
  |> String.trim
};