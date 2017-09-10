open Jest;

open Expect;

describe
  "Seat"
  (
    fun () => {
      open Seat;
      describe
        "rotate"
        (
          fun () =>
            test
              "rotates one place"
              (
                fun () => {
                  expect (rotate North) |> toEqual East;
                  expect (rotate West) |> toEqual North
                }
              )
        );
      describe
        "rotateN"
        (
          fun () => {
            test
            "rotates zero places"
            (
              fun () => {
                expect (rotateN North 0) |> toEqual North;
                expect (rotateN East 0) |> toEqual East
              }
            );
            test
              "rotates multiple places"
              (
                fun () => {
                  expect (rotateN North 2) |> toEqual South;
                  expect (rotateN West 5) |> toEqual North
                }
              );
            test
              "rotates backwards"
              (
                fun () => {
                  expect (rotateN North (-2)) |> toEqual South;
                  expect (rotateN West (-3)) |> toEqual North
                }
              )
          }
        )
    }
  );
