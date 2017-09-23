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

let compare a b => seat_to_enum a - seat_to_enum b;
/* ENDTODO */

exception UnexpectedError string;

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

let name =
  fun
  | North => "north"
  | East => "east"
  | South => "south"
  | West => "west";

let toPBN =
  fun
  | North => "N"
  | East => "E"
  | South => "S"
  | West => "W";

let fromPBN pbn => switch pbn {
  | "N" => North
  | "E" => East
  | "S" => South
  | "W" => West
  | _ => raise (Invalid_argument ("Invalid PBN Seat [" ^ pbn ^ "]"))
};

let isPartner seat1 seat2 => rotateN seat1 2 === seat2;
let isSameSide seat1 seat2 => (seat1 === seat2) || (isPartner seat1 seat2)