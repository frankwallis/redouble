open Jest;

open Expect;

describe(
  "Seat",
  () => {
    open Seat;
    describe(
      "rotate",
      () => {
        test("rotates one place North -> East", () => expect(rotate(North)) |> toEqual(East));
        test("rotates one place West -> North", () => expect(rotate(West)) |> toEqual(North))
      }
    );
    describe(
      "rotateN",
      () => {
        test(
          "rotates zero places North -> North",
          () => expect(rotateN(North, 0)) |> toEqual(North)
        );
        test("rotates zero places East -> East", () => expect(rotateN(East, 0)) |> toEqual(East));
        test("rotates 2 places North -> South", () => expect(rotateN(North, 2)) |> toEqual(South));
        test("rotates 5 places West -> North", () => expect(rotateN(West, 5)) |> toEqual(North));
        test(
          "rotates -2 places North -> South",
          () => expect(rotateN(North, (-2))) |> toEqual(South)
        );
        test(
          "rotates -7 places West -> North",
          () => expect(rotateN(West, (-7))) |> toEqual(North)
        )
      }
    )
  }
);
