jest.autoMockOff()

import {Seat} from '../seat';

describe("Seat", () => {

	 describe("rotate", () => {
		it("rotates through all the seats", () => {
			let seat = Seat.South;
			seat = Seat.rotate(seat, 1);
			expect(seat).toBe(Seat.West);
			seat = Seat.rotate(seat, 1);
			expect(seat).toBe(Seat.North);
			seat = Seat.rotate(seat, 1);
			expect(seat).toBe(Seat.East);
			seat = Seat.rotate(seat, 1);
			expect(seat).toBe(Seat.South);
		});

		it("rotates more than 4 positions at once", () => {
			let seat = Seat.South;
			seat = Seat.rotate(seat, 4001);
			expect(seat).toBe(Seat.West);
		});
	 });

	 describe("isPartner", () => {
		it("knows the partnerships", () => {
		  expect(Seat.isPartner(Seat.West, Seat.East)).toBeTruthy();
		  expect(Seat.isPartner(Seat.North, Seat.South)).toBeTruthy();
		  expect(Seat.isPartner(Seat.West, Seat.South)).toBeFalsy();
		  expect(Seat.isPartner(Seat.North, Seat.West)).toBeFalsy();
		});
	 });

});
