open Jest;
open Expect;

describe "Card" (fun () => {
  describe "deck" (fun () => {
    test "should have 52 cards" (fun () => {
      expect (List.length Card.deck) |> toEqual 52;
    })
  });

  describe "shuffle" (fun () => {
    test "returns cards in a different order" (fun () => {
      let shuffled1 = Card.deck |> Card.shuffle;
      let shuffled2 = Card.deck |> Card.shuffle;
      expect (shuffled1) |> not_ |> toEqual shuffled2;
    })
  });

  describe "deal" (fun () => {
    test "assigns 13 cards to each seat" (fun () => {
      let hands = Card.deal Seat.North;
      expect (Card.SeatMap.find Seat.North hands |> List.length) |> toEqual 13;
      expect (Card.SeatMap.find Seat.East hands |> List.length) |> toEqual 13;
      expect (Card.SeatMap.find Seat.South hands |> List.length) |> toEqual 13;
      expect (Card.SeatMap.find Seat.West hands |> List.length) |> toEqual 13;
    });
  });
});
