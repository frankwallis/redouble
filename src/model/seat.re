module Seat = {
  type seat = North | South | East | West;
  type t = seat;
  let rotate = fun
    | North => East
    | East => South
    | South => West
    | West => North;
  let all = [North, East, South, West];
  let value = fun
    | North => 1
    | East => 2
    | South => 3
    | West => 4;
  let compare a b => value(a) - value(b);
  let name = fun
    | North => "north"
    | East => "east"
    | South => "south"
    | West => "west";
};

module SeatMap = Map.Make Seat;
