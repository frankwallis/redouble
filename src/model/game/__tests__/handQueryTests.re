open Jest;
open Expect;

describe "HandQuery" (fun () => {
  open Card;

  describe "getPointCount" (fun () => {
    test "adds the high-card points" (fun () => {
      let board = Board.fromPBN "N: A432.K32.Q32.Q32 K65.A654.J54.J54 QJT.QJT.6789.678 987.987.AKT.AKT9";
      let points = board.hands |> SeatMap.map HandQuery.getPointCount;
      expect (SeatMap.bindings points) |> toEqual [(Seat.North, 11), (Seat.East, 9), (Seat.South, 6), (Seat.West, 14)];
    });

    test "adds the distribution points" (fun () => {
      let board = Board.fromPBN "N: AK65432.K32.Q2.Q .A654.J543.J5432 QJT98.QJT.9876.6 7.987.AKT.AKT987";
      let points = board.hands |> SeatMap.map HandQuery.getPointCount;
      expect (SeatMap.bindings points) |> toEqual [(Seat.North, 17), (Seat.East, 9), (Seat.South, 8), (Seat.West, 16)];
    });
  });
});
