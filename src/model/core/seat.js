/* @flow */

export const Seat = {
   North: 1,
   East: 2,
   South: 3,
   West: 4,

   all: function() {
      return [Seat.North, Seat.East, Seat.South, Seat.West];
   },

   name: function(seat) {
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
      count = count || 0;
      return ((seat + count - Seat.North) % 4) + Seat.North;
   },
   
   isPartner: function(seat1, seat2) {
      return (Seat.rotate(seat1, 2) === seat2);
   }

};