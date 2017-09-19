open BoardType;

let fromPBN pbn => {
  let parts = List.map String.trim (Utils.split_on_char ':' pbn);

  switch parts {
  | [pbn_dealer, pbn_deck] => {
      let dealer = Seat.fromPBN pbn_dealer;
      let pbn_hands = Utils.split_on_char ' ' pbn_deck;

      switch pbn_hands {
      | [_, _, _, _] => {
          let hand_pairs = pbn_hands |> List.mapi (fun idx pbn_hand => {
            (Seat.rotateN dealer idx, Card.handFromPBN pbn_hand)
          });

          let hands = hand_pairs |> List.fold_left (fun result (seat, hand) => {
            Card.SeatMap.add seat hand result;
          }) Card.SeatMap.empty;

          { dealer, hands, bids: [], cards: [] }
        }
      | _ => raise (Invalid_argument "Invalid PBN string")
      }
    }
  | _ => raise (Invalid_argument "Invalid PBN string")
  }
};