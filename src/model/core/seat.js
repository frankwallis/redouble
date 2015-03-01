export var Seat = { "North": 0, "East": 1, "South": 2, "West": 3 };

export var rotate = function(seat, count) {
   count = count || 1;
   return ((seat + count - tower.Seat.North) % 4) + Seat.North;
}

// export const Seat = new Enum({
//     North: {value: 0, description: 'north'},
//     West: {value: 1, description: 'east'},
//     South: {value: 2, description: 'south'},
//     West: {value: 3, description: 'west'}
// });
//
//
