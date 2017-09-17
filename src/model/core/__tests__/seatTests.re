open Jest;
open Expect;

describe "Seat" (fun () => {
  open Seat;

  describe "rotate" (fun () => {
    test "rotates one place North -> East" (fun () => {
      expect (rotate North) |> toEqual East;
    });
    test "rotates one place West -> North" (fun () => {
      expect (rotate West) |> toEqual North;
    });
  });

  describe "rotateN" (fun () => {
    test "rotates zero places North -> North" (fun () => {
      expect (rotateN North 0) |> toEqual North;
    });
    test "rotates zero places East -> East" (fun () => {
      expect (rotateN East 0) |> toEqual East;
    });
    test "rotates 2 places North -> South" (fun () => {
      expect (rotateN North 2) |> toEqual South;
    });
    test "rotates 5 places West -> North" (fun () => {
      expect (rotateN West 5) |> toEqual North;
    });
    test "rotates -2 places North -> South" (fun () => {
      expect (rotateN North (-2)) |> toEqual South;
    });
    test "rotates -7 places West -> North" (fun () => {
      expect (rotateN West (-7)) |> toEqual North;
    });
  })
});
