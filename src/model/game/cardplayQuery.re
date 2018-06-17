open BoardType;

open Card;

let trumpSuit = (board) =>
  switch (BiddingQuery.contractSuit(board)) {
  | Some(Bid.BidSuit.NoTrumps) => None
  | Some(Bid.BidSuit.Spades) => Some(Suit.Spades)
  | Some(Bid.BidSuit.Hearts) => Some(Suit.Hearts)
  | Some(Bid.BidSuit.Diamonds) => Some(Suit.Diamonds)
  | Some(Bid.BidSuit.Clubs) => Some(Suit.Clubs)
  | None => None
  };

let currentTrick = (board) => {
  let currentTrickCount = List.length(board.cards) mod 4;
  List.rev(Utils.take(currentTrickCount, board.cards))
};

let previousTrick = (board) => {
  let currentTrickCount = List.length(board.cards) mod 4;
  let completedCards = Utils.drop(currentTrickCount, board.cards);
  switch (Utils.take(4, completedCards)) {
  | [] => None
  | cards => Some(List.rev(cards))
  }
};

let completedTricks = (board) => {
  let rec completedTricksIter = (cards) =>
    switch cards {
    | [] => []
    | [card1, card2, card3, card4, ...rest] => [
        [card4, card3, card2, card1],
        ...completedTricksIter(rest)
      ]
    | _ => raise(invalid_arg("Unexpected error"))
    };
  let currentTrickCount = List.length(board.cards) mod 4;
  let completedCards = Utils.drop(currentTrickCount, board.cards);
  completedTricksIter(completedCards)
};

let winningCard = (trick, trumpSuit) => {
  let rec getCompeting = (trick, trumpSuit) =>
    switch trumpSuit {
    | Some(suit) =>
      switch (List.filter(((_pip, cardSuit)) => cardSuit == suit, trick)) {
      | [] => getCompeting(trick, None)
      | trumps => trumps
      }
    | None =>
      let (_pip, leadSuit) = List.hd(trick);
      List.filter(((_pip, cardSuit)) => cardSuit == leadSuit, trick)
    };
  switch (getCompeting(trick, trumpSuit)) {
  | [] => raise(Not_found)
  | competing => List.hd(List.rev(List.sort(Card.compare, competing)))
  }
};

let trickWinner = (board, trick) =>
  HandQuery.holder(winningCard(trick, trumpSuit(board)), board.hands);

let previousTrickWinner = (board) => previousTrick(board) |> Utils.optionMap(trickWinner(board));

let leader = (board) =>
  switch (previousTrickWinner(board)) {
  | Some(seat) => Some(seat)
  | None =>
    switch (BiddingQuery.declarer(board)) {
    | Some(declarer) => Some(Seat.rotate(declarer))
    | None => None
    }
  };

let currentTrickMap = (board) => {
  let cards = currentTrick(board);
  switch (leader(board)) {
  | Some(leader) =>
    Utils.range(4)
    |> List.fold_left(
         (result, idx) => {
           let seat = Seat.rotateN(leader, idx);
           let card = idx < List.length(cards) ? Some(List.nth(cards, idx)) : None;
           SeatMap.add(seat, card, result)
         },
         SeatMap.empty
       )
  | None => SeatMap.empty
  }
};

let remainingHands = (board) =>
  SeatMap.map((hand) => List.filter((card) => ! List.mem(card, board.cards), hand), board.hands);

let totalCards = (board) =>
  SeatMap.fold((_key, hand, result) => result + List.length(hand), board.hands, 0);

let playHasEnded = (board) => List.length(board.cards) == totalCards(board);

let declarerTricks = (board) =>
  switch (BiddingQuery.declarer(board)) {
  | None => raise(invalid_arg("declarer has not been decided"))
  | Some(declarer) =>
    completedTricks(board)
    |> List.map(trickWinner(board))
    |> List.filter((seat) => Seat.isSameSide(seat, declarer))
    |> List.length
  };
