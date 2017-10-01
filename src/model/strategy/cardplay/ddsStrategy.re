let toDdsSeat = fun
| Seat.North => Dds.north
| Seat.East => Dds.east
| Seat.South => Dds.south
| Seat.West => Dds.west;

let toDdsSuit = fun
| Card.Suit.Spades => Dds.spades
| Card.Suit.Hearts => Dds.hearts
| Card.Suit.Diamonds => Dds.diamonds
| Card.Suit.Clubs => Dds.clubs;

let fromDdsSuit ddsSuit => switch ddsSuit {
| 0 /* Dds.spades */ => Card.Suit.Spades
| 1 /* Dds.hearts */ => Card.Suit.Hearts
| 2 /* Dds.diamonds */ => Card.Suit.Diamonds
| 3 /* Dds.clubs */ => Card.Suit.Clubs
| _ => raise (invalid_arg ("Unhandled dds suit [" ^ (string_of_int ddsSuit) ^ "]"))
};

let toDdsRank pip =>
  Card.Pip.toValue pip;

let fromDdsRank rank =>
  Card.Pip.fromValue rank;

let toDdsBidSuit = fun
| Bid.BidSuit.NoTrumps => Dds.notrumps
| Bid.BidSuit.Spades => Dds.spades
| Bid.BidSuit.Hearts => Dds.hearts
| Bid.BidSuit.Diamonds => Dds.diamonds
| Bid.BidSuit.Clubs => Dds.clubs;

let chooseCard cards => {
  List.hd cards
};

let getCandidates solution => {
  let maxScore = Array.get solution##score 0;
  let maxScoreIndex = Js.Array.lastIndexOf maxScore solution##score;
  let inspectCount = min (maxScoreIndex + 1) solution##cards;

  let suits = Array.sub solution##suit 0 inspectCount |> Array.map fromDdsSuit |> Array.to_list;
  let pips = Array.sub solution##rank 0 inspectCount |> Array.map fromDdsRank |> Array.to_list;
  let equivalents = Array.sub solution##equals 0 inspectCount |> Array.to_list;

  let cardsWithEquivalents = (List.combine pips suits) |> List.combine equivalents;

  List.fold_left (fun candidates (equivalentField, (pip, suit)) => {
    let equivalentCards = List.fold_left (fun result tryPip => {
      let rank = toDdsRank tryPip;
      (equivalentField land (1 lsl rank) > 0) ? [(tryPip, suit), ...result] : result;
    }) [] Card.Pip.all;

    candidates @ [(pip, suit)] @ equivalentCards
  }) [] cardsWithEquivalents;
};

let getCard board => {
  let trump = switch (Board.contractSuit board) {
  | Some suit => toDdsBidSuit suit
  | None => raise (Invalid_argument "Unable to determine trump suit")
  };

  let first = switch (Board.leader board) {
  | Some seat => toDdsSeat seat
  | None => raise (Invalid_argument "Unable to determine trick leader")
  };

  let (currentPips, currentSuits) = List.split (Board.currentTrick board);
  let currentTrickRank = Array.of_list (currentPips |> List.map (fun pip => toDdsRank pip));
  let currentTrickSuit = Array.of_list (currentSuits |> List.map (fun suit => toDdsSuit suit));
  let remainCards = Board.toPBN board;

	let deal = [%bs.obj { trump, first, currentTrickRank, currentTrickSuit, remainCards }];
	let options = [%bs.obj {
		target: Dds.target_maximum,
		solutions: Dds.solution_full,
		mode: Dds.mode_auto_search
	}];

  Js.Promise.(
    (Dds.solveBoard deal options)
      |> then_ (fun solution => (getCandidates solution) |> chooseCard |> resolve)
  )
};