export var rotate = function(seat, count) {
   count = count || 1;
   return ((seat + count - tower.Seat.North) % 4) + tower.Seat.North;
}
