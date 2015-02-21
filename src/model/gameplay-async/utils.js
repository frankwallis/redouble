export var rotate = function(seat) {
    if (seat == tower.Seat.West)
        return tower.Seat.North;
    else
        return seat +1;
}
