let ddsSeat = fun
| Seat.North => Dds.north
| Seat.East => Dds.east
| Seat.South => Dds.south
| Seat.West => Dds.west;

let ddsSuit = fun
| Card.Suit.Spades => Dds.spades
| Card.Suit.Hearts => Dds.hearts
| Card.Suit.Diamonds => Dds.diamonds
| Card.Suit.Clubs => Dds.clubs;

let ddsRank pip =>
  Card.Pip.value pip;

let ddsBidSuit = fun
| Bid.BidSuit.NoTrumps => Dds.notrumps
| Bid.BidSuit.Spades => Dds.spades
| Bid.BidSuit.Hearts => Dds.hearts
| Bid.BidSuit.Diamonds => Dds.diamonds
| Bid.BidSuit.Clubs => Dds.clubs;

let chooseCard solutions _board => {
  List.hd solutions
};

let getCard board => {
  let trump = switch (Board.contractSuit board) {
  | Some suit => ddsBidSuit suit
  | None => raise (Invalid_argument "Unable to determine trump suit")
  };

  let first = switch (Board.leader board) {
  | Some seat => ddsSeat seat
  | None => raise (Invalid_argument "Unable to determine trick leader")
  };

  let (currentPips, currentSuits) = List.split (Board.currentTrick board);
  let currentTrickRank = Array.of_list (currentPips |> List.map (fun pip => ddsRank pip));
  let currentTrickSuit = Array.of_list (currentSuits |> List.map (fun suit => ddsSuit suit));

  /* TODO */
  let remainCards = Board.toPBN board;

	let deal = [%bs.obj { trump, first, currentTrickRank, currentTrickSuit, remainCards }];
	let options = [%bs.obj {
		target: Dds.target_maximum,
		solutions: Dds.solution_full,
		mode: Dds.mode_auto_search
	}];

  Js.Promise.(
    Dds.solveBoard deal options
      |> then_ (fun solutions => {
        (chooseCard solutions board) |> resolve
      })
  )
};