type seat = North | South | East | West;

module Seat = {
  type t = seat;

  let rotate seat =>
    switch seat {
      | North => East
      | East => South
      | South => West
      | West => North
    };
  let all = [North, East, South, West];
  let compare a b => 0;
};

module SeatMap = Map.Make Seat;
