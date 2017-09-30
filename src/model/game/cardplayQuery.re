open BoardType;
open Card;

let trumpSuit board =>
  switch (BiddingQuery.contractSuit board) {
  | Some Bid.BidSuit.NoTrumps => None
  | Some Bid.BidSuit.Spades => Some Suit.Spades
  | Some Bid.BidSuit.Hearts => Some Suit.Hearts
  | Some Bid.BidSuit.Diamonds => Some Suit.Diamonds
  | Some Bid.BidSuit.Clubs => Some Suit.Clubs
  | None => None
  };

let currentTrick board => {
  let currentTrickCount = (List.length board.cards) mod 4;
  List.rev (Utils.take currentTrickCount board.cards)
};

let previousTrick board => {
  let currentTrickCount = (List.length board.cards) mod 4;
  switch (Utils.take 4 (Utils.drop currentTrickCount board.cards)) {
  | [] => None
  | cards => Some (List.rev cards)
  }
};

let winningCard trick trumpSuit => {
  let rec getCompeting trick trumpSuit =>
    switch trumpSuit {
    | Some suit =>
      switch (List.filter (fun (_pip, cardSuit) => cardSuit == suit) trick) {
      | [] => getCompeting trick None
      | trumps => trumps
      };
    | None =>
      let (_pip, leadSuit) = List.hd trick;
      List.filter (fun (_pip, cardSuit) => cardSuit == leadSuit) trick;
    };

  switch (getCompeting trick trumpSuit) {
  | [] => raise Not_found
  | competing => List.hd (List.rev (List.sort Card.compare competing))
  }
};

let previousTrickWinner board => {
  (previousTrick board)
    |> Utils.optionMap (fun trick =>
      winningCard trick (trumpSuit board)
    )
    |> Utils.optionMap (fun card =>
      HandQuery.holder card board.hands
    )
};

let leader board => {
  switch (previousTrickWinner board) {
  | Some seat => Some seat
  | None =>
    switch (BiddingQuery.declarer board) {
    | Some declarer => Some (Seat.rotate declarer)
    | None => None
    }
  }
};

let remainingHands board => {
  SeatMap.map (fun hand =>
    List.filter (fun card => not (List.mem card board.cards)) hand
  ) board.hands
};

let totalCards board =>
  SeatMap.fold (fun _key hand result =>
    result + (List.length hand)
  ) board.hands 0;

let playHasEnded board =>
  (List.length board.cards == (totalCards board));

let declarerTricks _board =>
  0;
