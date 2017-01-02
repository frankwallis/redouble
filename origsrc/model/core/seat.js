/* @flow */

export const Seat = {
	North: 1,
	East: 2,
	South: 3,
	West: 4,

	all() {
		return [Seat.North, Seat.East, Seat.South, Seat.West];
	},

	name(seat) {
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

	rotate(seat, count) {
		count = count || 0;
		return ((seat + count - Seat.North) % 4) + Seat.North;
	},

	isPartner(seat1, seat2) {
		return (Seat.rotate(seat1, 2) === seat2);
	},

	fromPBN(idx) {
		return PBNSeatMap[idx];
	},

	toPBN(seat) {
		return PBNSeatMap.indexOf(seat);
	},

	fromPBNString(pbn) {
		return PBNSeatStringMap.indexOf(pbn);
	},

	toPBNString(seat) {
		return PBNSeatStringMap[seat];
	}

};

const PBNSeatMap = [Seat.North, Seat.East, Seat.South, Seat.West];
const PBNSeatStringMap = ["", "N", "E", "S", "W"];
