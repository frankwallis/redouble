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

  /* TODO */
  let remainCards = Board.toPBN board;

	let deal = [%bs.obj { trump, first, currentTrickRank, currentTrickSuit, remainCards }];
	let options = [%bs.obj {
		target: Dds.target_maximum,
		solutions: Dds.solution_full,
		mode: Dds.mode_auto_search
	}];

  (Dds.solveBoard deal options)
    |> Js.Promise.then_ (fun solution => {
      let suits = Array.sub solution##suit 0 solution##cards |> Array.to_list |> List.map fromDdsSuit;
      let pips = Array.sub solution##rank 0 solution##cards |> Array.to_list |> List.map fromDdsRank;
      let cards = List.combine pips suits;
      chooseCard cards |> Js.Promise.resolve
    })
};