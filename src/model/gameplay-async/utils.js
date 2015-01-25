export var rotate = function(seat) {
    if (seat == 3)//tower.Seat.West)
        return 0;//tower.Seat.North;
    else
        return seat +1;
}