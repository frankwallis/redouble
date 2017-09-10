type t =
  | North
  | East
  | South
  | West;

/*[@@deriving enum];*/
/* TODO - find out how to use @@deriving enum */
let seat_of_enum =
  fun
  | 0 => Some North
  | 1 => Some East
  | 2 => Some South
  | 3 => Some West
  | _ => None;

let seat_to_enum =
  fun
  | North => 0
  | East => 1
  | South => 2
  | West => 3;

let max_seat = 3;

exception UnexpectedError string;

/* ENDTODO */
let rotateN seat n => {
  let modulus = max_seat + 1;
  let adjustedN = (n mod modulus) + modulus;
  switch (seat_of_enum (((seat_to_enum seat) + adjustedN) mod modulus)) {
  | None => raise (UnexpectedError "Unexpected seat rotation error")
  | Some rotated => rotated
  }
};
let rotate seat => rotateN seat 1;

let all = [North, East, South, West];

let value =
  fun
  | North => 1
  | East => 2
  | South => 3
  | West => 4;

let compare a b => value a - value b;

let name =
  fun
  | North => "north"
  | East => "east"
  | South => "south"
  | West => "west";

let isPartner seat1 seat2 => rotateN seat1 2 === seat2;
let isSameSide seat1 seat2 => (seat1 === seat2) || (isPartner seat1 seat2)