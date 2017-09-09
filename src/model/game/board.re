module Board = {
  type t = {
    dealer: Seat.t,
    hands: Seat.t,
    bids: list Bid.t,
    cards: list Card.t
  }

/*  let create dealer => {
    let hands = Card.deal dealer;
    { dealer, hands, bids: [], cards: [] }
  }

  let makeBid board bid => {
    { ...board, [...board.bids, bid ] }
  }

  let playCard board card => {
    { ...board, [...board.cards, card ] }
  }*/
}



