open Bid;

let isSlamBid bid => {
  switch bid {
  | Call level _ => (level >= 6)
  | _ => false
  }
};

let isGameBid bid => {
  switch bid {
    | Call level suit => {
        switch suit {
        | BidSuit.NoTrumps => (level >= 3)
        | BidSuit.Spades => (level >= 4)
        | BidSuit.Hearts => (level >= 4)
        | BidSuit.Diamonds => (level >= 5)
        | BidSuit.Clubs => (level >= 5)
        }
      }
    | _ => false
    }
}