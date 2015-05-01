/// <reference path="../../_references.d.ts" />

export const Seat = {
   North: 0,
   East: 1,
   South: 2,
   West: 3,

   all: function() {
      return [0,1,2,3];
   },

   name: function(seat: number) {
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
   },

   rotate: function(seat, count) {
      count = count || 1;
      return ((seat + count - Seat.North) % 4) + Seat.North;
   }
};

// deprecated
export function seatName(seat) {
   return Seat.name(seat);
}
export const rotate = function(seat, count) {
   return Seat.rotate(seat, count);
}
