import {Seat} from '../seat';

describe("Seat", () => {

	describe("rotate", () => {
		it("rotates through all the seats", () => {
			let seat = Seat.South;
			seat = Seat.rotate(seat, 1);
			expect(seat).to.equal(Seat.West);
			seat = Seat.rotate(seat, 1);
			expect(seat).to.equal(Seat.North);
			seat = Seat.rotate(seat, 1);
			expect(seat).to.equal(Seat.East);
			seat = Seat.rotate(seat, 1);
			expect(seat).to.equal(Seat.South);
		});

		it("rotates more than 4 positions at once", () => {
			let seat = Seat.South;
			seat = Seat.rotate(seat, 4001);
			expect(seat).to.equal(Seat.West);
		});
	});

	describe("isPartner", () => {
		it("knows the partnerships", () => {
			expect(Seat.isPartner(Seat.West, Seat.East)).to.be.true;
			expect(Seat.isPartner(Seat.North, Seat.South)).to.be.true;
			expect(Seat.isPartner(Seat.West, Seat.South)).to.be.false;
			expect(Seat.isPartner(Seat.North, Seat.West)).to.be.false;
		});
	});

});
