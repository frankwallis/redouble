open Jest;
open Expect;

describe "GameReducer" (fun () => {
  describe "NewBoard" (fun () => {
    test "clears history and creates new board" (fun () => {
      let newState = GameReducer.reducer GameReducer.initialState (GameReducer.NewBoard Seat.North);
      expect (List.length newState.history) |> toEqual 1;
    })
  });

  /*describe "Push" (fun () => {
    test "prepends item to history and sets position to 0" (fun () => {
      let newState = GameReducer.reducer(GameReducer.NewBoard);
      expect (List.length newState.history) |> toEqual 1;
      expect (newState.position) |> toEqual 0;
    })
  });

  describe "Back" (fun () => {
    test "does nothing if " (fun () => {
      let newState = GameReducer.reducer(GameReducer.NewBoard);
      expect (List.length newState.history) |> toEqual 1;
      expect (newState.position) |> toEqual 0;
    })
  });

  describe "deal" (fun () => {
    test "assigns 13 cards to each seat" (fun () => {
    });
  });*/
});