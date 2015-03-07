jest.autoMockOff()

import {Seat, rotate} from '../seat';

describe("Seat", () => {

    describe("rotate", () => {
      it("rotates through all the seats", () => {
         var seat = Seat.South;
         seat = rotate(seat, 1);
         expect(seat).toBe(Seat.West);
         seat = rotate(seat, 1);
         expect(seat).toBe(Seat.North);
         seat = rotate(seat, 1);
         expect(seat).toBe(Seat.East);
         seat = rotate(seat, 1);
         expect(seat).toBe(Seat.South);
      });

      it("rotates more than 4 positions at once", () => {
         var seat = Seat.South;
         seat = rotate(seat, 4001);
         expect(seat).toBe(Seat.West);
      });
    });
});
