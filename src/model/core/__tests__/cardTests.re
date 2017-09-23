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
      let handList = (Card.SeatMap.bindings hands) |> List.map (fun (_seat, hand) => hand);
      expect (List.map (fun hand => List.length hand) handList) |> toEqual [13, 13, 13, 13];
    });
  });
});
