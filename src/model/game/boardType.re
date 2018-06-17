type t = {
  dealer: Seat.t,
  hands: Card.SeatMap.t(list(Card.t)),
  bids: list(Bid.t),
  cards: list(Card.t)
};
