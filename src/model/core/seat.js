/* @flow */

export const Seat = { "North": 0, "East": 1, "South": 2, "West": 3 };

export const rotate = function(seat, count) {
   count = count || 1;
   console.log('herre')
   return ((seat + count - Seat.North) % 4) + Seat.North;
}

export function seatName(seat) {
   switch(seat) {
   case Seat.North:
      return "north";
   case Seat.South:
      return "south";
   case Seat.East:
      return "east";
   case Seat.West:
      return "west";
   default:
      throw new Error("unrecognised seat");
   }
}

// export const Seat = new Enum({
//     North: {value: 0, description: 'north'},
//     West: {value: 1, description: 'east'},
//     South: {value: 2, description: 'south'},
//     West: {value: 3, description: 'west'}
// });
//
//
