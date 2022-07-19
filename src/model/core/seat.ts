

export enum Seat {
	North = 1,
	East = 2,
	South = 3,
	West = 4,
}

export namespace Seat {
	export function all() {
		return [Seat.North, Seat.East, Seat.South, Seat.West];
	}

	export function name(seat: Seat) {
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

	export function rotate(seat: Seat, count: number): Seat {
		count = count || 0;
		return ((seat + count - Seat.North) % 4) + Seat.North;
	}

	export function isPartner(seat1: Seat, seat2: Seat) {
		return (Seat.rotate(seat1, 2) === seat2);
	}

	export function fromPBN(idx: number) {
		return PBNSeatMap[idx];
	}

	export function toPBN(seat: Seat) {
		return PBNSeatMap.indexOf(seat);
	}

	export function fromPBNString(pbn: string): Seat {
		return PBNSeatStringMap.indexOf(pbn);
	}

	export function toPBNString(seat: Seat) {
		return PBNSeatStringMap[seat];
	}
}

const PBNSeatMap = [Seat.North, Seat.East, Seat.South, Seat.West];
const PBNSeatStringMap = ["", "N", "E", "S", "W"];
